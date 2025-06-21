import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { FormField } from '../index';

const StoreDetailsForm = ({ register, errors, handleSubmit, onSubmit, onCancel }) => (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'custom.highlight' }}>
            Basic Information
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormField
                    label="Store Name"
                    name="storeName"
                    placeholder="Enter your store name"
                    register={register}
                    error={errors.storeName}
                    helperText={errors.storeName?.message}
                    validationRules={{ required: 'Store name is required' }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Logo URL"
                    name="logo"
                    placeholder="Enter URL for your store logo"
                    register={register}
                    error={errors.logo}
                    helperText={errors.logo?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Banner URL"
                    name="banner"
                    placeholder="Enter URL for your store banner"
                    register={register}
                    error={errors.banner}
                    helperText={errors.banner?.message}
                />
            </Grid>
        </Grid>

        {/* Address Details Section */}
        <Typography variant="h6" sx={{ mt: 4, mb: 3, fontWeight: 'bold', color: 'custom.highlight' }}>
            Address Details
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Street"
                    name="addressStreet"
                    placeholder="Enter street address"
                    register={register}
                    error={errors.addressStreet}
                    helperText={errors.addressStreet?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="City"
                    name="addressCity"
                    placeholder="Enter city"
                    register={register}
                    error={errors.addressCity}
                    helperText={errors.addressCity?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="State"
                    name="addressState"
                    placeholder="Enter state"
                    register={register}
                    error={errors.addressState}
                    helperText={errors.addressState?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Zip"
                    name="addressZip"
                    placeholder="Enter zip code"
                    register={register}
                    error={errors.addressZip}
                    helperText={errors.addressZip?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Country"
                    name="addressCountry"
                    placeholder="Enter country"
                    register={register}
                    error={errors.addressCountry}
                    helperText={errors.addressCountry?.message}
                />
            </Grid>
        </Grid>

        {/* Store Contact Information Section */}
        <Typography variant="h6" sx={{ mt: 4, mb: 3, fontWeight: 'bold', color: 'custom.highlight' }}>
            Store Contact Information
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Mobile No"
                    name="storeMobile"
                    placeholder="Enter mobile number"
                    register={register}
                    error={errors.storeMobile}
                    helperText={errors.storeMobile?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Email ID"
                    name="storeEmail"
                    placeholder="Enter email address"
                    register={register}
                    error={errors.storeEmail}
                    helperText={errors.storeEmail?.message}
                />
            </Grid>
        </Grid>

        {/* Other Store Details */}
        <Typography variant="h6" sx={{ mt: 4, mb: 3, fontWeight: 'bold', color: 'custom.highlight' }}>
            Other Store Details
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormField
                    label="Store Description"
                    name="description"
                    placeholder="Describe your store and what you sell"
                    register={register}
                    multiline
                    rows={4}
                    error={errors.description}
                    helperText={errors.description?.message}
                />
            </Grid>
            <Grid item xs={12}>
                <FormField
                    label="Categories (comma separated)"
                    name="categories"
                    placeholder="e.g. Electronics, Accessories, Home Decor"
                    register={register}
                    error={errors.categories}
                    helperText={errors.categories?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Website"
                    name="website"
                    placeholder="e.g. www.yourstore.com"
                    register={register}
                    error={errors.website}
                    helperText={errors.website?.message}
                    validationRules={{
                        pattern: {
                            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                            message: 'Please enter a valid URL',
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Established Date"
                    name="establishedDate"
                    type="date"
                    register={register}
                    error={errors.establishedDate}
                    helperText={errors.establishedDate?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Owner Name"
                    name="ownerName"
                    placeholder="Enter owner's name"
                    register={register}
                    error={errors.ownerName}
                    helperText={errors.ownerName?.message}
                    validationRules={{ required: 'Owner name is required' }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="GST Number"
                    name="gstNumber"
                    placeholder="Enter GST Number"
                    register={register}
                    error={errors.gstNumber}
                    helperText={errors.gstNumber?.message}
                    validationRules={{
                        required: 'GST Number is required',
                        minLength: { value: 15, message: 'GST Number must be 15 characters' },
                        maxLength: { value: 15, message: 'GST Number must be 15 characters' }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="Aadhar Number"
                    name="aadharNumber"
                    placeholder="Enter Aadhar Number"
                    register={register}
                    error={errors.aadharNumber}
                    helperText={errors.aadharNumber?.message}
                    validationRules={{
                        required: 'Aadhar Number is required',
                        minLength: { value: 12, message: 'Aadhar Number must be 12 digits' },
                        maxLength: { value: 12, message: 'Aadhar Number must be 12 digits' }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormField
                    label="PAN Number"
                    name="panNumber"
                    placeholder="Enter PAN Number"
                    register={register}
                    error={errors.panNumber}
                    helperText={errors.panNumber?.message}
                    validationRules={{
                        required: 'PAN Number is required',
                        minLength: { value: 10, message: 'PAN Number must be 10 characters' },
                        maxLength: { value: 10, message: 'PAN Number must be 10 characters' }
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FormField
                    label="Return Policy"
                    name="returnPolicy"
                    placeholder="Describe your store's return and refund policy"
                    register={register}
                    multiline
                    rows={3}
                    error={errors.returnPolicy}
                    helperText={errors.returnPolicy?.message}
                />
            </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                    backgroundColor: 'custom.highlight',
                    color: 'white',
                    textTransform: 'uppercase',
                    fontWeight: 'medium',
                    borderRadius: 1,
                }}
            >
                Save Changes
            </Button>
            <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={onCancel}
                sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'medium',
                    borderRadius: 1,
                    color: 'custom.highlight',
                    borderColor: 'custom.highlight',
                }}
            >
                Cancel
            </Button>
        </Box>
    </Box>
);

export default StoreDetailsForm;
