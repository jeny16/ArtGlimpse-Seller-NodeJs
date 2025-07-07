import React from "react";
import { Card, CardContent, Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { getImageUrl } from "../appwrite/uploadimage";

const ProductCard = ({ item }) => {
    const theme = useTheme();
    const product = item.productData;

    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                p: theme.spacing(2),
                mb: theme.spacing(2),
                borderRadius: theme.spacing(1),
                border: `1px solid ${theme.palette.shades.light}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
        >
            <Box
                component="img"
                src={
                    product.images && product.images.length > 0
                        ? "None"
                        : "/api/placeholder/120/160"
                }
                alt={product.name}
                sx={{
                    width: 100,
                    height: 140,
                    objectFit: "cover",
                    borderRadius: theme.spacing(1),
                    border: `1px solid ${theme.palette.shades.light}`,
                }}
            />

            <CardContent
                sx={{
                    flexGrow: 1,
                    pl: theme.spacing(2),
                    py: theme.spacing(1),
                    "&:last-child": {
                        paddingBottom: theme.spacing(1)
                    }
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        mb: 1,
                        fontWeight: 700,
                        fontSize: "16px",
                        color: theme.palette.neutral.main || "#282c3f"
                    }}
                >
                    {product.name}
                </Typography>

                <Stack spacing={theme.spacing(0.5)} mt={theme.spacing(1)}>
                    <Typography variant="body2">
                        Price: ₹{product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                        Qty: {item.quantity}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            mt: theme.spacing(0.5),
                            color: theme.palette.custom.highlight
                        }}
                    >
                        Total: ₹{(product.price * item.quantity).toFixed(2)}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
