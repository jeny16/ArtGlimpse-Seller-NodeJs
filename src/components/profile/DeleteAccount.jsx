import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Checkbox,
    FormControlLabel,
    Alert,
    Stack
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSellerAccount } from '../../store/SellerProfileSlice';

const DeleteAccount = () => {
    const [checked, setChecked] = useState(false);
    const auth = useSelector((state) => state.auth);
    const sellerId = auth?.userData?.sellerId || auth?.userData?._id;
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (!sellerId) {
            alert('You must be logged in to delete your account.');
            return;
        }
        try {
            await dispatch(deleteSellerAccount({ sellerId })).unwrap();
            localStorage.removeItem('seller');
            window.location.href = '/';
        } catch (error) {
            console.error('Delete error:', error);
            alert(error || 'Failed to delete seller account');
        }
    };

    const handleKeepAccount = () => {
        window.history.back();
    };

    const deleteConsequences = [
        "All your listed products will be removed from the platform.",
        "You will lose access to your sales history and revenue analytics.",
        "Pending payouts and transactions will be canceled.",
        "To sell again, you'll need to re-register and verify your business identity.",
        "Some financial data may be retained for legal and auditing purposes."
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 3,
                boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                backgroundColor: 'tints.tint3',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)',
                    borderBottom: '1px solid',
                    borderColor: 'shades.light',
                }}
            >
                <Typography variant="h5" fontWeight="bold" sx={{ color: 'custom.highlight' }}>
                    Delete Seller Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Permanently remove your business and data from ArtGlimpse
                </Typography>
            </Box>

            {/* Body */}
            <Box sx={{ p: { xs: 4, md: 6 } }}>
                <Alert
                    severity="warning"
                    sx={{
                        mb: 4,
                        backgroundColor: 'rgba(193, 121, 18, 0.1)',
                        color: 'custom.accent',
                        '& .MuiAlert-icon': { color: 'custom.highlight' }
                    }}
                >
                    <Typography variant="body2" fontWeight="500">
                        This action is permanent and cannot be undone. Please make sure you've backed up your data.
                    </Typography>
                </Alert>

                <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
                    <strong>Are you sure?</strong> Deleting your seller account means:
                </Typography>

                <Stack spacing={2} sx={{ mb: 4 }}>
                    {deleteConsequences.map((point, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: 'rgba(193, 121, 18, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'custom.highlight',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}>
                                {index + 1}
                            </Box>
                            <Typography variant="body2">{point}</Typography>
                        </Box>
                    ))}
                </Stack>

                <Box
                    sx={{
                        bgcolor: 'rgba(193, 121, 18, 0.05)',
                        p: 2,
                        borderRadius: 2,
                        mb: 3
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                color="error"
                            />
                        }
                        label="I confirm I want to permanently delete my seller account"
                    />
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
                    Need help before deleting? <a href="/contact-support">Contact Seller Support</a>
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleKeepAccount}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            borderRadius: 2,
                            fontWeight: '600',
                            borderColor: 'custom.highlight',
                            color: 'custom.highlight',
                            '&:hover': {
                                backgroundColor: 'rgba(193, 121, 18, 0.05)',
                                borderColor: 'custom.highlight'
                            }
                        }}
                    >
                        Keep My Account
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleDelete}
                        disabled={!checked}
                        startIcon={<WarningAmberIcon />}
                        sx={{
                            fontWeight: '600',
                            borderRadius: 2,
                            py: 1.5,
                            px: 3,
                            order: { xs: 1, sm: 2 },
                            backgroundColor: 'custom.highlight',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'custom.accent',
                            },
                            '&:disabled': {
                                opacity: 0.5,
                                backgroundColor: 'shades.medium',
                                color: 'white'
                            }
                        }}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default DeleteAccount;
