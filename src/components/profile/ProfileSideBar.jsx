import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Avatar,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaymentIcon from '@mui/icons-material/Payment';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import authService from '../../action/authService';
import { logout } from '../../store/authSlice';

const ProfileSidebar = ({ activeSection, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const sidebarSections = [
    {
      title: 'ACCOUNT',
      items: [
        { label: 'Profile', id: 'profile', path: '/profile', icon: <PersonIcon /> },
        { label: 'Store Details', id: 'store-details', path: '/profile/store-details', icon: <StorefrontIcon /> },
        // { label: 'Payment Details', id: 'payment-details', path: '/profile/payment-details', icon: <PaymentIcon /> },
        { label: 'Delete Account', id: 'delete', path: '/profile/delete', icon: <DeleteIcon /> },
      ],
    },
    {
      title: 'LEGAL',
      items: [
        { label: 'Terms & Conditions', id: 'terms', path: '/profile/terms', icon: <DescriptionIcon /> },
        { label: 'Privacy Policy', id: 'privacy', path: '/profile/privacy', icon: <SecurityIcon /> },
      ],
    },
  ];

  const confirmLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          overflow: 'hidden',
          borderRadius: 2,
          transition: 'box-shadow 0.3s ease',
          width: 280,
        }}
      >
        {/* Top user info section */}
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'shades.light',
            backgroundColor: 'rgba(193, 121, 18, 0.05)',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'custom.highlight',
              width: 56,
              height: 56,
              mr: 2,
              boxShadow: '0 3px 6px rgba(193, 121, 18, 0.25)',
              border: '2px solid white',
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : ''}
          </Avatar>
          <Box>
            {user?.name && (
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  color: 'custom.accent',
                  mb: 0.5,
                }}
              >
                {user.name}
              </Typography>
            )}
            {user?.email && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                {user.email}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Sidebar sections */}
        {sidebarSections.map((section, sIndex) => (
          <Box key={`section-${sIndex}`}>
            {section.title && (
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  backgroundColor: 'rgba(193, 121, 18, 0.04)',
                  borderTop: sIndex > 0 ? '1px solid' : 'none',
                  borderBottom: '1px solid',
                  borderColor: 'rgba(193, 121, 18, 0.1)',
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  sx={{
                    color: 'text.secondary',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                  }}
                >
                  {section.title}
                </Typography>
              </Box>
            )}

            <List disablePadding>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      component={NavLink}
                      to={item.path}
                      sx={{
                        px: 3,
                        py: 1.8,
                        color: isActive ? 'custom.highlight' : 'text.primary',
                        backgroundColor: isActive ? 'rgba(193, 121, 18, 0.08)' : 'transparent',
                        '&:hover': {
                          backgroundColor: isActive
                            ? 'rgba(193, 121, 18, 0.12)'
                            : 'rgba(193, 121, 18, 0.04)',
                        },
                        borderLeft: '4px solid',
                        borderColor: isActive ? 'custom.highlight' : 'transparent',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          mr: 2,
                          color: isActive ? 'custom.highlight' : 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {item.icon}
                      </Box>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: isActive ? 'bold' : 'medium',
                          color: isActive ? 'custom.highlight' : 'inherit',
                          fontSize: '0.95rem',
                        }}
                      />
                      {isActive && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: 'custom.highlight',
                            ml: 1,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            {sIndex < sidebarSections.length - 1 && (
              <Divider sx={{ borderColor: 'rgba(193, 121, 18, 0.08)' }} />
            )}
          </Box>
        ))}

        <Divider sx={{ borderColor: 'rgba(193, 121, 18, 0.08)' }} />

        {/* Logout Button */}
        <Box sx={{ width: '100%' }}>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setLogoutDialogOpen(true)}
                sx={{
                  width: '100%',
                  px: 3,
                  py: 1.8,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.2)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <LogoutIcon sx={{ color: 'error.main' }} />
                </Box>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontWeight: 'bold',
                    color: 'error.main',
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Paper>

      {/* Logout Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title" sx={{ bgcolor: 'background.paper', fontWeight: 'bold' }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent sx={{ bgcolor: 'background.paper' }}>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: 'background.paper', p: 2 }}>
          <Button
            onClick={() => setLogoutDialogOpen(false)}
            sx={{
              color: 'custom.highlight',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(193, 121, 18, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            sx={{
              color: 'error.main',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(211, 47, 47, 0.2)',
              },
            }}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileSidebar;
