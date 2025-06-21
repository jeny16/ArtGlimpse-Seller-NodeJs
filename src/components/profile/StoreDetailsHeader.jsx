import React from 'react';
import {
    Box,
    Typography,
    Avatar,
} from '@mui/material';
import {
    Store as StoreIcon,
} from '@mui/icons-material';

const StoreDetailsHeader = ({ storeData }) => (
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
            src={storeData?.storeLogoUrl || ''}
        >
            {!storeData?.storeLogoUrl &&
                (storeData?.storeName ? storeData.storeName.charAt(0).toUpperCase() : <StoreIcon />)}
        </Avatar>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'custom.highlight', mb: 1 }}>
            Store Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Manage your store information and appearance
        </Typography>
    </Box>
);

export default StoreDetailsHeader;