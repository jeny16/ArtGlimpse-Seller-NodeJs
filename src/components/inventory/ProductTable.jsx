import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
    TableCell,
    Paper,
    Box,
    useTheme
} from '@mui/material';
import { InboxOutlined as EmptyIcon } from '@mui/icons-material';

import {
    StyledTableHead,
    StyledTableHeadCell,
    ProductTableRow,
    ProductDetailPanel
} from '../index';

const ProductTable = ({
    products,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    editingProduct,
    editedValues,
    expandedRow,
    getProductStatus,
    handleEditClick,
    handleDeleteClick,
    handleCancelEdit,
    handleFieldChange,
    handleSaveChanges,
    toggleRowExpansion,
    rowHeight
}) => {
    const theme = useTheme();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [detailPanelOpen, setDetailPanelOpen] = useState(false);

    // Normalize products: always ensure each product has an `id`
    const normalizedProducts = products.map(p => ({
        id: p.id || p._id,
        ...p
    }));

    const handleRowClick = (productId) => {
        if (!editingProduct) {
            const product = normalizedProducts.find(p => p.id === productId);
            setSelectedProduct(product);
            setDetailPanelOpen(true);
        }
    };

    const handleCloseDetailPanel = () => {
        setDetailPanelOpen(false);
    };

    const EmptyState = () => (
        <TableRow>
            <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
                    <EmptyIcon style={{ fontSize: 60, color: theme.palette.text.secondary, marginBottom: 16 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No products found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try adjusting your search criteria or filters
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    );

    return (
        <>
            <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableHeadCell width="40%">Product</StyledTableHeadCell>
                                <StyledTableHeadCell width="15%">Category</StyledTableHeadCell>
                                <StyledTableHeadCell width="10%" align="center">Stock</StyledTableHeadCell>
                                <StyledTableHeadCell width="15%" align="center">Price</StyledTableHeadCell>
                                <StyledTableHeadCell width="10%" align="center">Status</StyledTableHeadCell>
                                <StyledTableHeadCell width="10%" align="center">Actions</StyledTableHeadCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {normalizedProducts.length === 0 ? (
                                <EmptyState />
                            ) : (
                                normalizedProducts
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((product) => (
                                        <ProductTableRow
                                            key={product.id}
                                            product={product}
                                            isEditing={editingProduct === product.id}
                                            isExpanded={expandedRow === product.id}
                                            editedValues={editedValues}
                                            getProductStatus={getProductStatus}
                                            toggleRowExpansion={toggleRowExpansion}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                            handleCancelEdit={handleCancelEdit}
                                            handleFieldChange={handleFieldChange}
                                            handleSaveChanges={handleSaveChanges}
                                            rowHeight={rowHeight}
                                            onRowClick={handleRowClick}
                                        />
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={normalizedProducts.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    labelRowsPerPage="Products per page:"
                />
            </Paper>

            <ProductDetailPanel
                product={selectedProduct}
                open={detailPanelOpen}
                onClose={handleCloseDetailPanel}
            />
        </>
    );
};

export default ProductTable;
