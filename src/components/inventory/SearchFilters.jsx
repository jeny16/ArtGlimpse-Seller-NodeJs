import React from 'react';
import {
    Grid,
    Stack,
    Chip,
    InputAdornment,
    useTheme
} from '@mui/material';
import {
    Search as SearchIcon,
    Warning as WarningIcon,
    ErrorOutline as ErrorIcon,
    Discount as DiscountIcon
} from '@mui/icons-material';
import { SearchField } from '../index';

const SearchFilters = ({
    searchTerm,
    filters,
    handleSearchChange,
    toggleFilter,
    clearAllFilters,
    statsData
}) => {
    const theme = useTheme();
    const { lowStockCount, outOfStockCount, discountedCount } = statsData;

    const filterOptions = [
        {
            label: "Low Stock",
            icon: <WarningIcon />,
            filterName: 'showLowStock',
            color: "warning",
            count: lowStockCount
        },
        {
            label: "Out of Stock",
            icon: <ErrorIcon />,
            filterName: 'showOutOfStock',
            color: "error",
            count: outOfStockCount
        },
        {
            label: "On Discount",
            icon: <DiscountIcon />,
            filterName: 'showDiscount',
            color: "success",
            count: discountedCount
        }
    ];

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
                <SearchField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by product name, category, or tags..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {filterOptions.map((filter) => (
                        <Chip
                            key={filter.filterName}
                            label={`${filter.label} (${filter.count})`}
                            icon={filter.icon}
                            onClick={() => toggleFilter(filter.filterName)}
                            color={filters[filter.filterName] ? filter.color : "default"}
                            variant={filters[filter.filterName] ? "filled" : "outlined"}
                            sx={{ m: 0.5 }}
                        />
                    ))}

                    {(filters.showLowStock || filters.showOutOfStock || filters.showDiscount || searchTerm) && (
                        <Chip
                            label="Clear All"
                            onClick={clearAllFilters}
                            sx={{ m: 0.5 }}
                        />
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default SearchFilters;