import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Edit as EditIcon,
  Link as LinkIcon,
  CalendarMonth as CalendarMonthIcon,
  Policy as PolicyIcon,
  Store as StoreIcon,
  Description as DescriptionIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { StoreDetailsHeader, CategoriesDisplay, StoreDetailFieldDisplay, StoreDetailsForm } from '../index';
import { fetchStoreDetails, updateStoreDetails } from '../../store/StoreDetailsSlice';

// Helper function to extract userId from localStorage
const getUserId = () => {
  try {
    const userString = localStorage.getItem('seller');
    if (userString) {
      const userObj = JSON.parse(userString);
      return userObj?.userId;
    }
    const persistRoot = JSON.parse(localStorage.getItem('persist:root'));
    if (persistRoot?.auth) {
      const authData = JSON.parse(persistRoot.auth);
      return authData?.userId;
    }
  } catch (err) {
    console.error("Error extracting userId from localStorage:", err);
  }
  return null;
};

// Convert backend date (dd-MM-yyyy) to yyyy-MM-dd for date input.
const convertForInput = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    return dateStr;
  }
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

// Convert date from yyyy-MM-dd (from date input) to dd-MM-yyyy for backend.
const formatDateForBackend = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

const StoreDetails = () => {
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.storeDetails);
  const userId = getUserId();
  const [isEditing, setIsEditing] = useState(false);

  // Initialize react-hook-form with defaultValues including new fields.
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      storeName: details?.storeName || '',
      description: details?.description || '',
      logo: details?.storeLogoUrl || '',
      banner: details?.storeBannerUrl || '',
      // New address fields
      addressStreet: details?.addressStreet || '',
      addressCity: details?.addressCity || '',
      addressState: details?.addressState || '',
      addressZip: details?.addressZip || '',
      addressCountry: details?.addressCountry || '',
      // Existing field (if you were using a string before, now split into parts)
      categories: details?.categories ? details.categories.join(', ') : '',
      website: details?.website || '',
      establishedDate: details?.establishedDate ? convertForInput(details.establishedDate) : '',
      returnPolicy: details?.returnPolicy || '',
      ownerName: details?.ownerName || '',
      gstNumber: details?.gstNumber || '',
      aadharNumber: details?.aadharNumber || '',
      panNumber: details?.panNumber || '',
      // New store contact fields
      storeMobile: details?.storeMobile || '',
      storeEmail: details?.storeEmail || '',
    }
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchStoreDetails(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (details) {
      reset({
        storeName: details.storeName || '',
        description: details.description || '',
        logo: details.storeLogoUrl || '',
        banner: details.storeBannerUrl || '',
        addressStreet: details.addressStreet || '',
        addressCity: details.addressCity || '',
        addressState: details.addressState || '',
        addressZip: details.addressZip || '',
        addressCountry: details.addressCountry || '',
        categories: details.categories ? details.categories.join(', ') : '',
        website: details.website || '',
        establishedDate: details.establishedDate ? convertForInput(details.establishedDate) : '',
        returnPolicy: details.returnPolicy || '',
        ownerName: details.ownerName || '',
        gstNumber: details.gstNumber || '',
        aadharNumber: details.aadharNumber || '',
        panNumber: details.panNumber || '',
        storeMobile: details.storeMobile || '',
        storeEmail: details.storeEmail || '',
      });
    }
  }, [details, reset]);

  const onSubmit = (data) => {
    if (!userId) {
      console.error("No userId found!");
      return;
    }
    const processedData = {
      storeName: data.storeName.trim(),
      description: data.description.trim(),
      storeLogoUrl: data.logo.trim(),
      storeBannerUrl: data.banner.trim(),
      // Combine address details from separate fields
      addressStreet: data.addressStreet.trim(),
      addressCity: data.addressCity.trim(),
      addressState: data.addressState.trim(),
      addressZip: data.addressZip.trim(),
      addressCountry: data.addressCountry.trim(),
      categories: data.categories.split(',').map(cat => cat.trim()).filter(Boolean),
      website: data.website.trim(),
      establishedDate: formatDateForBackend(data.establishedDate),
      returnPolicy: data.returnPolicy.trim(),
      ownerName: data.ownerName.trim(),
      gstNumber: data.gstNumber.trim(),
      aadharNumber: data.aadharNumber.trim(),
      panNumber: data.panNumber.trim(),
      storeMobile: data.storeMobile.trim(),
      storeEmail: data.storeEmail.trim(),
    };
    dispatch(updateStoreDetails({ sellerId: userId, storeDetails: processedData }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  if (status === 'loading') {
    return (
      <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <CircularProgress sx={{ color: 'custom.highlight' }} />
          <Typography variant="body1" mt={2}>Loading store details...</Typography>
        </Box>
      </Paper>
    );
  }

  if (status === 'failed') {
    return (
      <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
        <Box p={4}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load store details: {error}
          </Alert>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'custom.highlight',
              color: 'custom.highlight'
            }}
            onClick={() => dispatch(fetchStoreDetails(userId))}
          >
            Try Again
          </Button>
        </Box>
      </Paper>
    );
  }

  // Updated view fields (including address details and contact info)
  const viewFields = [
    { label: 'Store Name', value: details?.storeName || '', icon: <StoreIcon /> },
    { label: 'Description', value: details?.description || '', icon: <DescriptionIcon /> },
    {
      label: 'Address', value:
        `${details?.addressStreet || ''} ${details?.addressCity || ''} ${details?.addressState || ''} ${details?.addressZip || ''} ${details?.addressCountry || ''}`.trim() || '',
      icon: <DescriptionIcon />
    },
    { label: 'Website', value: details?.website || '', icon: <LinkIcon /> },
    { label: 'Established Date', value: details?.establishedDate || '', icon: <CalendarMonthIcon /> },
    { label: 'Return Policy', value: details?.returnPolicy || '', icon: <PolicyIcon /> },
    { label: 'Owner Name', value: details?.ownerName || '', icon: <PersonIcon /> },
    { label: 'GST Number', value: details?.gstNumber || '', icon: <DescriptionIcon /> },
    { label: 'Aadhar Number', value: details?.aadharNumber || '', icon: <DescriptionIcon /> },
    { label: 'PAN Number', value: details?.panNumber || '', icon: <DescriptionIcon /> },
    { label: 'Mobile No', value: details?.storeMobile || '', icon: <DescriptionIcon /> },
    { label: 'Email ID', value: details?.storeEmail || '', icon: <DescriptionIcon /> },
  ];

  return (
    <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      <StoreDetailsHeader storeData={details} />
      <Box sx={{ p: { xs: 2, sm: 4 } }}>
        {(!details || !details.storeName) && !isEditing ? (
          <Box textAlign="center" py={6}>
            <Typography variant="h6" sx={{ mb: 2, color: 'custom.highlight' }}>
              You haven't set up your store yet
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Complete your store details to start selling products
            </Typography>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                backgroundColor: 'custom.highlight',
                color: 'white',
                textTransform: 'uppercase',
                fontWeight: 'medium',
                borderRadius: 1,
              }}
              onClick={() => setIsEditing(true)}
            >
              Set Up Your Store
            </Button>
          </Box>
        ) : isEditing ? (
          <StoreDetailsForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <Grid container spacing={3}>
              {viewFields.map((field, index) => (
                <Grid item xs={12} key={index}>
                  <StoreDetailFieldDisplay label={field.label} value={field.value} icon={field.icon} />
                  {field.label === 'Description' &&
                    details?.categories &&
                    details.categories.length > 0 && (
                      <Box sx={{ ml: 7, mb: 2 }}>
                        <CategoriesDisplay categories={details.categories} />
                      </Box>
                    )}
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  backgroundColor: 'custom.highlight',
                  color: 'white',
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                  borderRadius: 1,
                }}
                onClick={() => setIsEditing(true)}
              >
                Edit Store
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default StoreDetails;
