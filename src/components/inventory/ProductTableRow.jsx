import React from 'react';
import {
    TableCell,
    TableRow,
    IconButton,
    Typography,
    Box,
    Stack,
    Avatar,
    Chip,
    Tooltip,
    TextField,
    useTheme
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Image as ImageIcon,
    Category as CategoryIcon,
    Warning as WarningIcon,
    ErrorOutline as ErrorIcon,
    CheckCircleOutline as CheckIcon
} from '@mui/icons-material';
import {
    NumberInput,
    TruncatedTypography,
    STOCK_STATUS_COLORS,
    NAME_MAX_LENGTH,
    formatCurrency
} from '../index';
// import { getImageUrl } from '../../appwrite/uploadimage';

const getStatusIcon = (status) => {
    switch (status) {
        case "In Stock":
            return <CheckIcon />;
        case "Low Stock":
            return <WarningIcon />;
        case "Out of Stock":
            return <ErrorIcon />;
        default:
            return null;
    }
};

const ProductTableRow = ({
    product,
    isEditing,
    isExpanded,
    editedValues,
    getProductStatus,
    toggleRowExpansion,
    handleEditClick,
    handleDeleteClick,
    handleCancelEdit,
    handleFieldChange,
    handleSaveChanges,
    rowHeight,
    onRowClick
}) => {
    const theme = useTheme();
    const productStatus = getProductStatus(product.stock);

    // Truncate long names
    const truncatedName = product.name.length > NAME_MAX_LENGTH
        ? `${product.name.substring(0, NAME_MAX_LENGTH)}...`
        : product.name;

    // Correct price calculation: treat product.price as original,
    // compute discounted price = original * (1 - pct/100)
    const discountPct = product.percentage_Discount || 0;
    const discountedPrice = product.discount
        ? Math.round(product.price * (1 - discountPct / 100))
        : product.price;

    // Handle row click (expand + detail panel)
    const handleRowClick = (e) => {
        if (!isEditing) {
            toggleRowExpansion(product.id);
            onRowClick(product.id);
        }
    };

    return (
        <TableRow
            hover
            sx={{
                cursor: 'pointer',
                backgroundColor: isExpanded ? theme.palette.action.hover : 'inherit',
                '&:hover': { backgroundColor: theme.palette.action.hover },
                height: rowHeight
            }}
            onClick={handleRowClick}
        >
            {/* Product Name & Image */}
            <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        variant="rounded"
                        src={
                            product.images && product.images.length > 0
                                ? "none"
                                : undefined
                        }
                        sx={{ width: 50, height: 50 }}
                    >
                        <ImageIcon />
                    </Avatar>
                    <Box maxWidth="calc(100% - 70px)">
                        <TruncatedTypography>
                            <Typography variant="subtitle1" fontWeight="medium" component="span">
                                {truncatedName}
                            </Typography>
                        </TruncatedTypography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                            ID: {product.id.substring(0, 8)}...
                        </Typography>
                        {product.discount && (
                            <Chip
                                size="small"
                                label={`${discountPct}% OFF`}
                                color="error"
                                sx={{ ml: 1, height: 20 }}
                            />
                        )}
                    </Box>
                    {!isEditing && (
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleRowExpansion(product.id);
                            }}
                        >
                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    )}
                </Stack>
            </TableCell>

            {/* Category */}
            <TableCell>
                {isEditing ? (
                    <TextField
                        size="small"
                        value={editedValues?.categories || product.categories || ""}
                        onChange={(e) => handleFieldChange("categories", e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                ) : (
                    <Chip
                        icon={<CategoryIcon />}
                        label={product.categories || "Uncategorized"}
                        size="small"
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.custom.highlight,
                            color: theme.palette.custom.highlight
                        }}
                    />
                )}
            </TableCell>

            {/* Stock */}
            <TableCell align="center">
                {isEditing ? (
                    <NumberInput
                        type="number"
                        value={editedValues?.stock}
                        onChange={(e) => handleFieldChange("stock", e.target.value)}
                        sx={{ width: '80px' }}
                        inputProps={{ min: 0, step: 1 }}
                    />
                ) : (
                    <Typography
                        variant="body1"
                        fontWeight={product.stock < 10 ? "bold" : "normal"}
                        color={
                            product.stock === 0
                                ? "error.main"
                                : product.stock < 10
                                    ? "warning.main"
                                    : "text.primary"
                        }
                    >
                        {product.stock}
                    </Typography>
                )}
            </TableCell>

            {/* Price */}
            <TableCell align="center">
                {isEditing ? (
                    <NumberInput
                        type="number"
                        value={editedValues?.price}
                        onChange={(e) => handleFieldChange("price", e.target.value)}
                        sx={{ width: '100px' }}
                        inputProps={{ min: 0, step: 100 }}
                    />
                ) : (
                    <Stack direction="column" alignItems="center">
                        <Typography variant="body1" fontWeight="medium">
                            {formatCurrency(discountedPrice, product.currency || 'INR')}
                        </Typography>
                        {product.discount && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textDecoration: 'line-through' }}
                            >
                                {formatCurrency(product.price, product.currency || 'INR')}
                            </Typography>
                        )}
                    </Stack>
                )}
            </TableCell>

            {/* Status */}
            <TableCell align="center">
                <Chip
                    icon={getStatusIcon(productStatus)}
                    label={productStatus}
                    color={STOCK_STATUS_COLORS[productStatus]}
                    size="small"
                    sx={{ fontWeight: 'medium' }}
                />
            </TableCell>

            {/* Actions */}
            <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                {isEditing ? (
                    <>
                        <Tooltip title="Save">
                            <IconButton
                                color="primary"
                                size="small"
                                onClick={() => handleSaveChanges(product.id)}
                            >
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <IconButton
                                color="default"
                                size="small"
                                onClick={handleCancelEdit}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                sx={{ color: theme.palette.custom.highlight }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(product);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                color="error"
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(product);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </TableCell>
        </TableRow>
    );
};

export default ProductTableRow;
