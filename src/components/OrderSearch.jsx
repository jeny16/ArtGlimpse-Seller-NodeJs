import React from "react";
import { Box, TextField, InputAdornment, alpha, useTheme, IconButton, Tooltip } from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

const OrderSearch = ({ searchTerm, onSearchChange }) => {
    const theme = useTheme();

    const handleClear = () => {
        // Create a synthetic event
        const event = { target: { value: "" } };
        onSearchChange(event);
    };

    return (
        <Box
            sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2
            }}
        >
            <TextField
                placeholder="Search by order ID, customer name or items..."
                variant="outlined"
                size="medium"
                value={searchTerm}
                onChange={onSearchChange}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{
                                color: theme.palette.custom.highlight,
                                opacity: 0.7
                            }} />
                        </InputAdornment>
                    ),
                    endAdornment: searchTerm ? (
                        <InputAdornment position="end">
                            <Tooltip title="Clear search">
                                <IconButton
                                    size="small"
                                    onClick={handleClear}
                                    edge="end"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        '&:hover': {
                                            color: theme.palette.custom.highlight
                                        }
                                    }}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ) : null,
                    sx: {
                        borderRadius: 3,
                        py: 0.5,
                        '&.Mui-focused': {
                            boxShadow: `0 0 0 3px ${alpha(theme.palette.custom.highlight, 0.15)}`
                        }
                    },
                }}
                sx={{
                    minWidth: { xs: "100%", sm: 400 },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: alpha(theme.palette.custom.highlight, 0.2),
                        },
                        '&:hover fieldset': {
                            borderColor: alpha(theme.palette.custom.highlight, 0.4),
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.custom.highlight,
                        },
                    },
                    transition: 'all 0.2s ease',
                }}
            />
        </Box>
    );
};

export default OrderSearch;