// PaymentDetails.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';

const PaymentDetails = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Payment Details</Typography>
      <Typography variant="body2">
        Manage your payment methods, view transaction history, and update billing information.
      </Typography>
    </Paper>
  );
};

export default PaymentDetails;
