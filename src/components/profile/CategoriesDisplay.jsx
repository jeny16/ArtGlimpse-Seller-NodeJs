import React from 'react';
import {
    Box,
    Chip
} from '@mui/material';

const CategoriesDisplay = ({ categories }) => {
    if (!categories || !Array.isArray(categories) || categories.length === 0) return null;
    return (
        <Box sx={{ mt: 1 }}>
            <Box display="flex" flexWrap="wrap" gap={1}>
                {categories.map((cat, i) => (
                    <Chip
                        key={i}
                        label={cat}
                        sx={{
                            borderRadius: 1,
                            bgcolor: 'rgba(193, 121, 18, 0.1)',
                            color: 'custom.highlight',
                            fontWeight: 'medium'
                        }}
                        size="small"
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CategoriesDisplay;