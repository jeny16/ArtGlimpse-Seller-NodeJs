import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import StoreIcon from '@mui/icons-material/Store';
import { FormField } from '../index'; // common FormField component
import { fetchSellerProfile, updateSellerProfile } from '../../store/SellerProfileSlice';

const SellerProfileHeader = ({ sellerData }) => (
  <Box
    sx={{
      p: 4,
      textAlign: 'center',
      backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)',
      borderBottom: '1px solid',
      borderColor: 'shades.light'
    }}
  >
    <Avatar
      sx={{
        width: 100,
        height: 100,
        mx: 'auto',
        mb: 2,
        bgcolor: 'custom.highlight',
        boxShadow: '0 4px 12px rgba(193, 121, 18, 0.3)'
      }}
    >
      {sellerData?.name ? sellerData.name.charAt(0).toUpperCase() : 'NA'}
    </Avatar>
    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'custom.highlight', mb: 1 }}>
      Seller Profile
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Manage your seller account information
    </Typography>
  </Box>
);

const SellerProfileFieldDisplay = ({ label, value, icon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, borderBottom: '1px solid #f0f0f0' }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'rgba(193, 121, 18, 0.1)',
        color: 'custom.highlight',
        mr: 2
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography
        variant="body1"
        fontWeight={value && value.trim() !== '' ? 'medium' : 'regular'}
        color={value && value.trim() !== '' ? 'text.primary' : 'text.secondary'}
      >
        {value && value.trim() !== '' ? value : 'NA'}
      </Typography>
    </Box>
  </Box>
);

const SellerProfileForm = ({ register, errors, handleSubmit, onSubmit, onCancel }) => (
  <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormField
          label="Name"
          name="name"
          placeholder="Enter your name"
          register={register}
          error={errors.name}
          helperText={errors.name?.message}
          rules={{ required: 'Name is required' }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          register={register}
          error={errors.email}
          helperText={errors.email?.message}
          autoComplete="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Enter a valid email'
            }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Contact Number"
          name="contactNumber"
          placeholder="Enter your contact number"
          register={register}
          error={errors.contactNumber}
          helperText={errors.contactNumber?.message}
          rules={{
            required: 'Contact number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Enter a valid 10-digit mobile number'
            }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Store Name"
          name="storeName"
          placeholder="Enter your store name"
          register={register}
          error={errors.storeName}
          helperText={errors.storeName?.message}
          rules={{ required: 'Store name is required' }}
        />
      </Grid>
    </Grid>
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, textAlign: 'center' }}>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: 'custom.highlight',
          color: 'white',
          textTransform: 'uppercase',
          fontWeight: 'medium',
          borderRadius: 1,
        }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderColor: 'custom.highlight',
          color: 'custom.highlight',
          textTransform: 'uppercase',
          fontWeight: 'medium',
          borderRadius: 1,
        }}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Box>
  </Box>
);

const SellerProfile = () => {
  const dispatch = useDispatch();
  const { sellerProfile, status, error } = useSelector(state => state.sellerProfile);
  const auth = useSelector(state => state.auth);
  const sellerId = auth.userData?.sellerId || auth.userData?._id;
  const [editing, setEditing] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: sellerProfile?.name || '',
      email: sellerProfile?.email || '',
      contactNumber: sellerProfile?.contactNumber || '',
      storeName: sellerProfile?.storeName || ''
    }
  });

  useEffect(() => {
    if (sellerId && !sellerProfile) {
      dispatch(fetchSellerProfile({ sellerId }));
    }
  }, [dispatch, sellerId, sellerProfile]);

  useEffect(() => {
    reset({
      name: sellerProfile?.name && sellerProfile.name !== 'NA' ? sellerProfile.name : '',
      email: sellerProfile?.email && sellerProfile.email !== 'NA' ? sellerProfile.email : '',
      contactNumber: sellerProfile?.contactNumber && sellerProfile.contactNumber !== 'NA' ? sellerProfile.contactNumber : '',
      storeName: sellerProfile?.storeName && sellerProfile.storeName !== 'NA' ? sellerProfile.storeName : ''
    });
  }, [sellerProfile, reset]);

  const onSubmit = async (data) => {
    try {
      if (sellerId) {
        const mergedData = { ...sellerProfile, ...data };
        await dispatch(updateSellerProfile({ sellerId, profileData: mergedData }));
        setEditing(false);
      }
    } catch (error) {
      console.error('Seller profile update failed', error);
    }
  };

  const getValue = (value) =>
    value && value.trim() !== '' ? value : 'NA';

  const viewFields = [
    { label: 'Name', value: getValue(sellerProfile?.name), icon: <PersonIcon /> },
    { label: 'Email', value: getValue(sellerProfile?.email), icon: <EmailIcon /> },
    { label: 'Contact Number', value: getValue(sellerProfile?.contactNumber), icon: <PhoneIcon /> },
    { label: 'Store Name', value: getValue(sellerProfile?.storeName), icon: <StoreIcon /> }
  ];

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }
  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      <SellerProfileHeader sellerData={sellerProfile} />
      <Box sx={{ p: { xs: 2, sm: 4 } }}>
        {editing ? (
          <SellerProfileForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onCancel={() => {
              reset();
              setEditing(false);
            }}
          />
        ) : (
          <>
            <Grid container spacing={3}>
              {viewFields.map((field, index) => (
                <Grid item xs={12} key={index}>
                  <SellerProfileFieldDisplay label={field.label} value={field.value} icon={field.icon} />
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
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default SellerProfile;
