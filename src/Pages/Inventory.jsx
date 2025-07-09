import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory, deleteProduct } from "../store/inventorySlice";
import { useNavigate } from "react-router-dom";
import {
  ProductTable,
  InventoryStats,
  SearchFilters,
  ProductDetailPanel,
  ConfirmationDialog,
  NotificationManager,
  MainContainer,
  STOCK_STATUS,
  ROW_HEIGHT
} from "../components/index";
import { Box, Typography, Grid, Paper, Button, Stack, Alert, CircularProgress, useTheme, Modal, IconButton } from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import AddProduct from "../Pages/AddProduct";

const Inventory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inventoryItems, isLoading, error } = useSelector((state) => state.inventory);
  // Also listen to addProduct slice's success flag
  const { success: addProductSuccess } = useSelector((state) => state.addProduct);

  // Inventory states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    showLowStock: false,
    showOutOfStock: false,
    showDiscount: false
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  // State for editing product in modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Fetch inventory on component mount
  useEffect(() => {
    const userData = localStorage.getItem("seller");
    // console.log("seller data :::", userData);
    if (userData) {
      const user = JSON.parse(userData);
      const sellerId = user.userId;
      if (sellerId) {
        dispatch(fetchInventory(sellerId));
      } else {
        showNotification("Seller ID is missing in localStorage.", "error");
      }
    }
  }, [dispatch]);

  // Re-fetch inventory when a product is successfully added or updated
  useEffect(() => {
    if (addProductSuccess) {
      const userData = localStorage.getItem("seller");
      if (userData) {
        const sellerId = JSON.parse(userData).sellerId;
        if (sellerId) {
          dispatch(fetchInventory(sellerId));
        }
      }
    }
  }, [addProductSuccess, dispatch]);

  // Filter products based on search and filters
  useEffect(() => {
    if (inventoryItems && inventoryItems.length > 0) {
      let results = [...inventoryItems];
      // Search term filtering
      if (searchTerm) {
        results = results.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.category.name && product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
        );
      }
      // Additional filters
      if (filters.showLowStock) {
        results = results.filter(product => product.stock > 0 && product.stock < 10);
      }
      if (filters.showOutOfStock) {
        results = results.filter(product => product.stock === 0);
      }
      if (filters.showDiscount) {
        results = results.filter(product => product.discount === true);
      }
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [inventoryItems, searchTerm, filters]);

  const getProductStatus = (stock) => {
    if (stock === 0) return STOCK_STATUS.OUT_OF_STOCK;
    if (stock < 10) return STOCK_STATUS.LOW_STOCK;
    return STOCK_STATUS.IN_STOCK;
  };

  const showNotification = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Edit product in modal
  const handleEditProductClick = (product) => {
    // console.log("product to edit:", product);
    setProductToEdit(product);
    setEditModalOpen(true);
  };

  // Navigate to Add Product page
  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setProductToEdit(null);
  };

  // Delete product handlers
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id))
        .then(() => {
          showNotification(
            `${productToDelete.name} has been deleted successfully.`
          );
          const userData = localStorage.getItem("seller");
          if (userData) {
            const sellerId =
              JSON.parse(userData).sellerId || JSON.parse(userData).userId;
            if (sellerId) {
              dispatch(fetchInventory(sellerId));
            }
          }
        })
        .catch(() => {
          showNotification(
            "Failed to delete product. Please try again.",
            "error"
          );
        });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Row expansion handlers
  const toggleRowExpansion = (productId) => {
    setExpandedRow(prev => (prev === productId ? null : productId));
  };

  const handleCloseDetailPanel = () => {
    setExpandedRow(null);
  };

  // Search and filter handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const toggleFilter = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName]
    });
    setPage(0);
  };

  const clearAllFilters = () => {
    setFilters({
      showLowStock: false,
      showOutOfStock: false,
      showDiscount: false
    });
    setSearchTerm("");
  };

  // Stats calculations
  const statsData = {
    totalProducts: inventoryItems.length,
    inStockCount: inventoryItems.filter(p => p.stock >= 10).length,
    lowStockCount: inventoryItems.filter(p => p.stock > 0 && p.stock < 10).length,
    outOfStockCount: inventoryItems.filter(p => p.stock === 0).length,
    discountedCount: inventoryItems.filter(p => p.discount === true).length
  };

  return (
    <MainContainer>
      <Grid container spacing={3} maxWidth="lg" mx="auto">
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
            <Typography variant="h4" sx={{
              fontWeight: 600,
              color: theme.palette.custom.highlight,
              borderBottom: `2px solid ${theme.palette.custom.highlight}`,
              paddingBottom: 1
            }}>
              Manage Inventory
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProductClick}
              sx={{
                backgroundColor: theme.palette.custom.highlight,
                color: theme.palette.common.white,
                '&:hover': { backgroundColor: theme.palette.custom.accent }
              }}
            >
              Add Product
            </Button>
          </Stack>
        </Grid>

        {isLoading ? (
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress sx={{ color: theme.palette.custom.highlight }} />
          </Grid>
        ) : error ? (
          <Grid item xs={12}>
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          </Grid>
        ) : (
          <>
            {/* Stats Cards */}
            <Grid item xs={12}>
              <InventoryStats statsData={statsData} />
            </Grid>

            {/* Search and Filters */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <SearchFilters
                  searchTerm={searchTerm}
                  filters={filters}
                  handleSearchChange={handleSearchChange}
                  toggleFilter={toggleFilter}
                  clearAllFilters={clearAllFilters}
                  statsData={statsData}
                />
              </Paper>
            </Grid>

            {/* Products Table */}
            <Grid item xs={12}>
              <Paper elevation={3}>
                <ProductTable
                  products={filteredProducts}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  expandedRow={expandedRow}
                  getProductStatus={getProductStatus}
                  handleEditClick={handleEditProductClick}
                  handleDeleteClick={handleDeleteClick}
                  toggleRowExpansion={toggleRowExpansion}
                  rowHeight={ROW_HEIGHT}
                />
              </Paper>
            </Grid>
          </>
        )}
      </Grid>

      {/* Expanded Product Details Panel */}
      {expandedRow && (
        <ProductDetailPanel
          product={filteredProducts.find(p => p.id === expandedRow)}
          onClose={handleCloseDetailPanel}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Product"
        message={`Are you sure you want to delete ${productToDelete?.name}?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmColor="error"
      />

      {/* Notification Snackbar */}
      <NotificationManager
        notification={notification}
        handleClose={handleCloseNotification}
      />

      {/* Edit Product Modal */}
      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-product-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          width: { xs: '95%', sm: '90%', md: '85%', lg: '80%' },
          maxWidth: 'lg',
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: 2,
        }}>
          <Box display="flex" justifyContent="flex-end" p={1}>
            <IconButton onClick={handleCloseEditModal} sx={{ color: theme.palette.custom.highlight }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <AddProduct
            initialValues={productToEdit}
            mode="edit"
            onClose={handleCloseEditModal}
            // showNotification={showNotification}
          />
        </Box>
      </Modal>
    </MainContainer>
  );
};

export default Inventory;
