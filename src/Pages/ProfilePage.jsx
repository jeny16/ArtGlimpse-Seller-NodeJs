import React, { useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import ProfileSidebar from '../components/profile/ProfileSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProfile } from '../store/SellerProfileSlice';
import { Outlet, useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { sellerProfile, loading, error } = useSelector(state => state.sellerProfile);
  const auth = useSelector(state => state.auth);
  // Adjust this according to your auth state; here we assume sellerId is stored as such
  const sellerId = auth.userData?.sellerId || auth.userData?._id;

  const location = useLocation();
  // Determine active section from URL; expecting URL like /seller/<section>
  const pathParts = location.pathname.split('/');
  const activeSection = pathParts[2] || 'sellerProfile';

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchSellerProfile({ sellerId }));
    }
  }, [dispatch, sellerId]);

  if (!sellerId) {
    return (
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h5" align="center">
          Please login to view your profile.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5, my: 20 }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #fdf7ed 0%, #fefaf4 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderLeft: '4px solid',
          borderColor: 'custom.highlight',
          transition: 'all 0.3s ease'
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          sx={{
            color: 'custom.highlight',
            mb: 1,
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          My Account
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            mt: 2
          }}
        >
          {sellerProfile?.name ? `Welcome back, ${sellerProfile.name}` : 'Welcome back'}
        </Typography>
      </Paper>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Sidebar */}
          <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
            <ProfileSidebar activeSection={activeSection} user={sellerProfile} />
          </Box>
          {/* Content Area */}
          <Box sx={{ flexGrow: 1, width: { xs: '100%', md: 'calc(100% - 320px)' } }}>
            <Outlet context={{ sellerProfile }} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ProfilePage;
