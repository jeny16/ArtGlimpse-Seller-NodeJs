import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const NotificationManager = ({ notification, handleClose }) => {
    const { open, message, severity } = notification;

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={SlideTransition}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationManager;