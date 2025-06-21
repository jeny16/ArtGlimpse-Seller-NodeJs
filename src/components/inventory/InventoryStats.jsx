import React from 'react';
import {
    Grid,
    CardContent,
    Typography,
    Stack,
    Avatar,
    Box,
    useTheme
} from '@mui/material';
import {
    Inventory as InventoryIcon,
    CheckCircleOutline as CheckIcon,
    Warning as WarningIcon,
    ErrorOutline as ErrorIcon,
    Discount as DiscountIcon
} from '@mui/icons-material';
import { StatsCard } from '../index';

const InventoryStats = ({ statsData }) => {
    const theme = useTheme();
    const { totalProducts, inStockCount, lowStockCount, outOfStockCount, discountedCount } = statsData;

    const statsConfig = [
        {
            title: "Total Products",
            value: totalProducts,
            icon: <InventoryIcon />,
            color: theme.palette.custom.highlight
        },
        {
            title: "In Stock",
            value: inStockCount,
            icon: <CheckIcon />,
            color: theme.palette.success.main
        },
        {
            title: "Low Stock",
            value: lowStockCount,
            icon: <WarningIcon />,
            color: theme.palette.warning.main,
            note: lowStockCount > 0 ? "Needs attention" : null,
            noteColor: "warning.main"
        },
        {
            title: "On Discount",
            value: discountedCount,
            icon: <DiscountIcon />,
            color: theme.palette.custom.highlight
        }
    ];

    return (
        <Grid container spacing={2}>
            {statsConfig.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatsCard elevation={3}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar sx={{ bgcolor: stat.color }}>
                                    {stat.icon}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" color="text.secondary">{stat.title}</Typography>
                                    <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                                    {stat.note && (
                                        <Typography variant="caption" color={stat.noteColor}>
                                            {stat.note}
                                        </Typography>
                                    )}
                                </Box>
                            </Stack>
                        </CardContent>
                    </StatsCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default InventoryStats;