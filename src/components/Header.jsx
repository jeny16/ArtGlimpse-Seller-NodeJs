// import React, { memo, useState } from 'react';
// import { Search, Menu as MenuIcon, X as CloseIcon, BarChart2, Package, FileText, LogOut, PlusCircle, User } from 'lucide-react';
// import {
//   AppBar,
//   Box,
//   Button,
//   Container,
//   Drawer,
//   IconButton,
//   TextField,
//   Typography,
//   useTheme,
//   Divider
// } from '@mui/material';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import { useDispatch, useSelector } from "react-redux";
// import authService from "../action/authService";
// import { logout } from "../store/authSlice";

// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.neutral.light,
//   boxShadow: 'none',
//   borderBottom: '1px solid #dbd4c7'
// }));

// const StyledButton = styled(Button)(({ theme, active }) => ({
//   color: theme.palette.neutral.main,
//   fontWeight: 500,
//   textTransform: 'none',
//   width: '100%',
//   justifyContent: 'flex-start',
//   padding: '8px 16px',
//   '&:hover': {
//     backgroundColor: 'transparent',
//     color: '#000'
//   },
//   '&.MuiButtonBase-root': {
//     disableRipple: true
//   }
// }));

// const IconWrapper = styled(IconButton)(({ theme }) => ({
//   color: theme.palette.custom.highlight,
//   '&:hover': {
//     backgroundColor: 'transparent',
//     color: theme.palette.custom.accent
//   }
// }));

// const Header = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [searchQuery, setSearchQuery] = useState('');

//   // Get isLoggedIn from Redux
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const user = useSelector((state) => state.auth.user);
//   const products = useSelector((state) => state.inventory.inventoryItems);

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   const handleLogout = () => {
//     authService.logout();
//     dispatch(logout());
//     navigate('/login');
//   };

//   // Simple case-insensitive filtering on product name.
//   const filteredProducts = searchQuery.trim()
//     ? products.filter(product =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     : [];

//   const renderAuthButtons = () => (
//     <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
//       <Link to="/login">
//         <Button
//           variant="outlined"
//           sx={{
//             color: theme.palette.custom.highlight,
//             borderColor: theme.palette.custom.highlight,
//             textTransform: 'none',
//             fontWeight: 500,
//             '&:hover': {
//               borderColor: theme.palette.custom.accent,
//               backgroundColor: theme.palette.primary.main
//             }
//           }}
//         >
//           Login
//         </Button>
//       </Link>
//       <Link to="/signup">
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: theme.palette.custom.highlight,
//             textTransform: 'none',
//             fontWeight: 500,
//             color: '#fff',
//             '&:hover': { backgroundColor: theme.palette.custom.accent }
//           }}
//         >
//           Sign Up
//         </Button>
//       </Link>
//     </Box>
//   );

//   const renderUserIcons = () => (
//     <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
//       <IconWrapper onClick={() => navigate("/profile")}>
//         <User size={24} />
//       </IconWrapper>
//     </Box>
//   );

//   const renderMobileMenu = () => (
//     <Drawer
//       anchor="right"
//       open={drawerOpen}
//       onClose={() => setDrawerOpen(false)}
//       sx={{ display: { xs: 'flex', md: 'none' } }}
//     >
//       <Box
//         width="250px"
//         role="presentation"
//         sx={{
//           backgroundColor: theme.palette.primary.main,
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           padding: 0,
//           boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <Box display="flex" justifyContent="flex-end" p={2}>
//           <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: theme.palette.neutral.light }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//           <Link to="/dashboard" style={{ width: '100%' }}>
//             <StyledButton
//               onClick={() => setDrawerOpen(false)}
//               active={isActive('/dashboard').toString()}
//               startIcon={<BarChart2 size={20} />}
//             >
//               Dashboard
//             </StyledButton>
//           </Link>
//           <Link to="/inventory" style={{ width: '100%' }}>
//             <StyledButton
//               onClick={() => setDrawerOpen(false)}
//               active={isActive('/inventory').toString()}
//               startIcon={<Package size={20} />}
//             >
//               Inventory
//             </StyledButton>
//           </Link>
//           <Link to="/add-product" style={{ width: '100%' }}>
//             <StyledButton
//               onClick={() => setDrawerOpen(false)}
//               active={isActive('/add-product').toString()}
//               startIcon={<PlusCircle size={20} />}
//             >
//               Add Product
//             </StyledButton>
//           </Link>
//           <Link to="/orders" style={{ width: '100%' }}>
//             <StyledButton
//               onClick={() => setDrawerOpen(false)}
//               active={isActive('/orders').toString()}
//               startIcon={<FileText size={20} />}
//             >
//               Orders
//             </StyledButton>
//           </Link>

//           {!isLoggedIn ? (
//             <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
//               <Link to="/login" style={{ width: '100%' }}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   onClick={() => setDrawerOpen(false)}
//                   sx={{
//                     color: theme.palette.custom.highlight,
//                     borderColor: theme.palette.custom.highlight,
//                     '&:hover': {
//                       color: theme.palette.custom.accent,
//                       borderColor: theme.palette.custom.accent
//                     }
//                   }}
//                 >
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/signup" style={{ width: '100%' }}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={() => setDrawerOpen(false)}
//                   sx={{
//                     backgroundColor: theme.palette.custom.highlight,
//                     color: '#fff',
//                     '&:hover': {
//                       backgroundColor: theme.palette.custom.accent
//                     }
//                   }}
//                 >
//                   Sign Up
//                 </Button>
//               </Link>
//             </Box>
//           ) : (
//             <Box
//               sx={{
//                 borderTop: '1px solid #dbd4c7',
//                 mt: 2,
//                 pt: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 1
//               }}
//             >
//               <StyledButton
//                 onClick={() => {
//                   handleLogout();
//                   setDrawerOpen(false);
//                 }}
//                 startIcon={<LogOut size={20} />}
//                 sx={{
//                   borderRadius: 1,
//                   '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
//                 }}
//               >
//                 Logout
//               </StyledButton>
//               <Link to="/profile" style={{ width: '100%' }}>
//                 <StyledButton
//                   onClick={() => setDrawerOpen(false)}
//                   startIcon={<User size={20} />}
//                   sx={{
//                     borderRadius: 1,
//                     '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
//                   }}
//                 >
//                   Profile
//                 </StyledButton>
//               </Link>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Drawer>
//   );

//   return (
//     <>
//       <StyledAppBar position="fixed">
//         <Container>
//           <Box display="flex" alignItems="center" py={3} px={1} justifyContent="space-between">
//             <Link to='/dashboard' style={{ textDecoration: 'none' }}>
//               <Typography
//                 variant="h5"
//                 component="div"
//                 sx={{
//                   fontFamily: 'serif',
//                   color: theme.palette.custom.highlight,
//                   fontWeight: 'bold',
//                   '&:hover': {
//                     color: theme.palette.custom.accent
//                   }
//                 }}
//               >
//                 ArtGlimpse Seller
//               </Typography>
//             </Link>
//             <Box display="flex" gap={4} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
//               <Link to="/dashboard">
//                 <StyledButton active={isActive('/dashboard').toString()}>Dashboard</StyledButton>
//               </Link>
//               <Link to="/inventory">
//                 <StyledButton active={isActive('/inventory').toString()}>Inventory</StyledButton>
//               </Link>
//               <Link to="/add-product">
//                 <StyledButton active={isActive('/add-product').toString()}>Add Product</StyledButton>
//               </Link>
//               <Link to="/orders">
//                 <StyledButton active={isActive('/orders').toString()}>Orders</StyledButton>
//               </Link>
//             </Box>
//             <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
//             <Box position="relative">
//                 <TextField
//                   size="small"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search for products, categories..."
//                   variant="outlined"
//                   InputProps={{
//                     startAdornment: (
//                       <Search
//                         size={20}
//                         style={{ marginRight: 8, color: theme.palette.secondary.main }}
//                       />
//                     ),
//                     sx: { paddingInline: '10px', fontSize: '14px' }
//                   }}
//                   sx={{
//                     backgroundColor: theme.palette.primary.main,
//                     borderRadius: '50px',
//                     border: '1px solid #dbd4c7',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': { border: 'none' },
//                       '&:hover fieldset': { borderColor: theme.palette.primary.dark },
//                       '&.Mui-focused fieldset': { borderColor: theme.palette.custom.highlight }
//                     },
//                     '& input::placeholder': {
//                       color: theme.palette.secondary.main,
//                       fontStyle: 'italic'
//                     }
//                   }}
//                 />
//                 {searchQuery && filteredProducts.length > 0 && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: '100%',
//                       left: 0,
//                       right: 0,
//                       backgroundColor: '#fff',
//                       zIndex: 10,
//                       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                       maxHeight: 300,
//                       overflowY: 'auto'
//                     }}
//                   >
//                     {filteredProducts.map((product) => (
//                       <Box
//                         key={product.id}
//                         onClick={() => {
//                           setSearchQuery('');
//                           // Open modal and pass the clicked product data.
//                           setSelectedProduct(product);
//                           setProductModalOpen(true);
//                         }}
//                         sx={{
//                           padding: '8px 16px',
//                           cursor: 'pointer',
//                           '&:hover': { backgroundColor: theme.palette.action.hover }
//                         }}
//                       >
//                         <Typography variant="body2">{product.name}</Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 )}
//               </Box>
//               {isLoggedIn ? renderUserIcons() : renderAuthButtons()}
//             </Box>
//             <IconButton
//               sx={{
//                 display: { xs: 'flex', md: 'none' },
//                 color: theme.palette.custom.highlight,
//                 '&:hover': {
//                   color: theme.palette.custom.accent
//                 }
//               }}
//               onClick={() => setDrawerOpen(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//           </Box>
//         </Container>
//       </StyledAppBar>

//       {renderMobileMenu()}
//     </>
//   );
// };

// export default memo(Header);

import React, { memo, useState } from 'react';
import { Search, Menu as MenuIcon, X as CloseIcon, BarChart2, Package, FileText, LogOut, PlusCircle, User } from 'lucide-react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Divider
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import authService from "../action/authService";
import { logout } from "../store/authSlice";
import {ProductDetailPanel} from './index'; // Adjust the import path as necessary

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.neutral.light,
  boxShadow: 'none',
  borderBottom: '1px solid #dbd4c7'
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
  color: theme.palette.neutral.main,
  fontWeight: 500,
  textTransform: 'none',
  width: '100%',
  justifyContent: 'flex-start',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000'
  },
  '&.MuiButtonBase-root': {
    disableRipple: true
  }
}));

const IconWrapper = styled(IconButton)(({ theme }) => ({
  color: theme.palette.custom.highlight,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.custom.accent
  }
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // New state for modal integration
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Get isLoggedIn from Redux and seller data (if required)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.inventory.inventoryItems);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  // Filter products on search query (case-insensitive)
  const filteredProducts = searchQuery.trim()
    ? products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const renderAuthButtons = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      <Link to="/login">
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.custom.highlight,
            borderColor: theme.palette.custom.highlight,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              borderColor: theme.palette.custom.accent,
              backgroundColor: theme.palette.primary.main
            }
          }}
        >
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.custom.highlight,
            textTransform: 'none',
            fontWeight: 500,
            color: '#fff',
            '&:hover': { backgroundColor: theme.palette.custom.accent }
          }}
        >
          Sign Up
        </Button>
      </Link>
    </Box>
  );

  const renderUserIcons = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
      <IconWrapper onClick={() => navigate("/profile")}>
        <User size={24} />
      </IconWrapper>
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      sx={{ display: { xs: 'flex', md: 'none' } }}
    >
      <Box
        width="250px"
        role="presentation"
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: theme.palette.neutral.light }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Link to="/dashboard" style={{ width: '100%' }}>
            <StyledButton
              onClick={() => setDrawerOpen(false)}
              active={isActive('/dashboard').toString()}
              startIcon={<BarChart2 size={20} />}
            >
              Dashboard
            </StyledButton>
          </Link>
          <Link to="/inventory" style={{ width: '100%' }}>
            <StyledButton
              onClick={() => setDrawerOpen(false)}
              active={isActive('/inventory').toString()}
              startIcon={<Package size={20} />}
            >
              Inventory
            </StyledButton>
          </Link>
          <Link to="/add-product" style={{ width: '100%' }}>
            <StyledButton
              onClick={() => setDrawerOpen(false)}
              active={isActive('/add-product').toString()}
              startIcon={<PlusCircle size={20} />}
            >
              Add Product
            </StyledButton>
          </Link>
          <Link to="/orders" style={{ width: '100%' }}>
            <StyledButton
              onClick={() => setDrawerOpen(false)}
              active={isActive('/orders').toString()}
              startIcon={<FileText size={20} />}
            >
              Orders
            </StyledButton>
          </Link>

          {!isLoggedIn ? (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/login" style={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    color: theme.palette.custom.highlight,
                    borderColor: theme.palette.custom.highlight,
                    '&:hover': {
                      color: theme.palette.custom.accent,
                      borderColor: theme.palette.custom.accent
                    }
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup" style={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    backgroundColor: theme.palette.custom.highlight,
                    color: '#fff',
                    '&:hover': { backgroundColor: theme.palette.custom.accent }
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Box>
          ) : (
            <Box
              sx={{
                borderTop: '1px solid #dbd4c7',
                mt: 2,
                pt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <StyledButton
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                startIcon={<LogOut size={20} />}
                sx={{
                  borderRadius: 1,
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                Logout
              </StyledButton>
              <Link to="/profile" style={{ width: '100%' }}>
                <StyledButton
                  onClick={() => setDrawerOpen(false)}
                  startIcon={<User size={20} />}
                  sx={{
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                  }}
                >
                  Profile
                </StyledButton>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Container>
          <Box display="flex" alignItems="center" py={3} px={1} justifyContent="space-between">
            <Link to='/dashboard' style={{ textDecoration: 'none' }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: 'serif',
                  color: theme.palette.custom.highlight,
                  fontWeight: 'bold',
                  '&:hover': {
                    color: theme.palette.custom.accent
                  }
                }}
              >
                ArtGlimpse Seller
              </Typography>
            </Link>
            <Box display="flex" gap={4} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link to="/dashboard">
                <StyledButton active={isActive('/dashboard').toString()}>Dashboard</StyledButton>
              </Link>
              <Link to="/inventory">
                <StyledButton active={isActive('/inventory').toString()}>Inventory</StyledButton>
              </Link>
              <Link to="/add-product">
                <StyledButton active={isActive('/add-product').toString()}>Add Product</StyledButton>
              </Link>
              <Link to="/orders">
                <StyledButton active={isActive('/orders').toString()}>Orders</StyledButton>
              </Link>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              <Box position="relative">
                <TextField
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, categories..."
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <Search
                        size={20}
                        style={{ marginRight: 8, color: theme.palette.secondary.main }}
                      />
                    ),
                    sx: { paddingInline: '10px', fontSize: '14px' }
                  }}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50px',
                    border: '1px solid #dbd4c7',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                      '&.Mui-focused fieldset': { borderColor: theme.palette.custom.highlight }
                    },
                    '& input::placeholder': {
                      color: theme.palette.secondary.main,
                      fontStyle: 'italic'
                    }
                  }}
                />
                {searchQuery && filteredProducts.length > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: '#fff',
                      zIndex: 10,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      maxHeight: 300,
                      overflowY: 'auto'
                    }}
                  >
                    {filteredProducts.map((product) => (
                      <Box
                        key={product.id}
                        onClick={() => {
                          setSearchQuery('');
                          // Open the modal and pass the selected product.
                          setSelectedProduct(product);
                          setProductModalOpen(true);
                        }}
                        sx={{
                          padding: '8px 16px',
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: theme.palette.action.hover }
                        }}
                      >
                        <Typography variant="body2">{product.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              {isLoggedIn ? renderUserIcons() : renderAuthButtons()}
            </Box>
            <IconButton
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: theme.palette.custom.highlight,
                '&:hover': {
                  color: theme.palette.custom.accent
                }
              }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Container>
      </StyledAppBar>

      {renderMobileMenu()}

      {/* Render the ProductDetailPanel as a modal (remains outside the header content) */}
      {selectedProduct && (
        <ProductDetailPanel
          product={selectedProduct}
          open={productModalOpen}
          onClose={() => setProductModalOpen(false)}
        />
      )}
    </>
  );
};

export default memo(Header);
