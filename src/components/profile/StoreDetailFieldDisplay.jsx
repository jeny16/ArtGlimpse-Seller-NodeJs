import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';

const StoreDetailFieldDisplay = ({ label, value, icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #f0f0f0' }}>
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
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" fontWeight={value?.trim() ? 'medium' : 'regular'} color={value?.trim() ? 'text.primary' : 'text.secondary'}>
                {value?.trim() || 'NA'}
            </Typography>
        </Box>
    </Box>
);

export default StoreDetailFieldDisplay;