import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Box,
    Typography,
    useTheme
} from '@mui/material';
import {
    Warning as WarningIcon
} from '@mui/icons-material';

const ConfirmationDialog = ({
    open,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    confirmColor = "primary",
    showWarningIcon = true
}) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderTop: confirmColor === "error" ? `4px solid ${theme.palette.error.main}` : `4px solid ${theme.palette.primary.main}`,
                    borderRadius: '4px'
                }
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {showWarningIcon && confirmColor === "error" && (
                        <WarningIcon color="error" />
                    )}
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button onClick={onCancel} variant="outlined"
                    sx={{
                        borderRadius: "4px",
                        px: 3,
                        py: 1,
                        color: theme.palette.custom.highlight,
                        borderColor: theme.palette.custom.highlight,
                        "&:hover": {
                            borderColor: theme.palette.custom.accent,
                            backgroundColor: theme.palette.tints.tint2,
                        },
                        flex: { xs: 1, sm: "none" },
                    }}
                >
                    {cancelLabel}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color={confirmColor}
                    autoFocus
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;