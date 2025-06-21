import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Link, 
  Container 
} from '@mui/material';
import { 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        width: "100vw", // Ensures full screen width
        backgroundColor: (theme) => theme.palette.custom.accent,
        color: "white",
        py: 6,
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6"
              sx={{
                fontFamily: "Raleway, serif",
                fontWeight: 600,
                mb: 2,
                letterSpacing: 1,
                background: "linear-gradient(45deg, #FFFFFF 30%, #E0E0E0 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ArtGlimpse Seller
            </Typography>
            <Typography 
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontWeight: 300 }}
            >
              Empowering artists to showcase and sell their unique creations with ease.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {[
                { text: "Dashboard", path: "/dashboard" },
                { text: "Add Product", path: "/add-product" },
                { text: "Manage Inventory", path: "/inventory" },
                { text: "Sales Analytics", path: "/analytics" }
              ].map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    mb: 1,
                    opacity: 0.8,
                    "&:hover": {
                      opacity: 1,
                      transform: "translateX(5px)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Mail size={20} style={{ marginRight: 10 }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                support@artglimpse.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone size={20} style={{ marginRight: 10 }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                +91 8511998086
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MapPin size={20} style={{ marginRight: 10 }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                123 Art Street, Creative City, ST 12345
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box 
          sx={{ 
            borderTop: "1px solid rgba(255,255,255,0.1)", 
            mt: 4, 
            pt: 4,
            textAlign: "center" 
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            © {new Date().getFullYear()} ArtGlimpse Seller Portal. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
