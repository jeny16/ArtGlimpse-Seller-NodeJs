// Cleaned AddProduct Component without Appwrite (for AWS setup)
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Chip,
  Stack,
  IconButton,
  Card,
  CircularProgress,
  Container,
} from "@mui/material";
import { ImagePlus, Tag, Package2, X, Save } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  resetProductState,
} from "../store/addProductSlice";
import { FormField, NotificationManager } from "../components/index";
import { fetchCategories } from "../action/categoryService";

const AddProduct = ({ initialValues = null, mode = "add", onClose  }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector(
    (state) => state.addProduct
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    discount: false,
    percentage_Discount: "",
    materials_Made: "",
    tags: [],
    valid_Until_Discount: "",
    processing_Time: "",
    shipping_Time: "",
    shipping_Cost: "",
    estimated_Delivery: "",
    countries_Available: "",
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState([]);
  
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  
  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };
  
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };
  // Fetch categories for dropdown
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  useEffect(() => {
    if (initialValues) {
      setProductData({
        name: initialValues.name || "",
        description: initialValues.description || "",
        price: initialValues.price || "",
        stock: initialValues.stock || "",
        category: initialValues.category?._id || "",
        discount: initialValues.discount || false,
        percentage_Discount: initialValues.percentage_Discount || "",
        materials_Made: Array.isArray(initialValues.materials_Made)
          ? initialValues.materials_Made.join(", ")
          : initialValues.materials_Made || "",
        tags: Array.isArray(initialValues.tags) ? initialValues.tags : [],
        valid_Until_Discount: initialValues.valid_Until_Discount || "",
        processing_Time: initialValues.processing_Time || "",
        shipping_Time: initialValues.shipping_Time || "",
        shipping_Cost: initialValues.shipping_Cost || "",
        estimated_Delivery: initialValues.estimated_Delivery || "",
        countries_Available: Array.isArray(initialValues.countries_Available)
          ? initialValues.countries_Available.join(", ")
          : initialValues.countries_Available || "",
        id: initialValues.id,
      });
      if (initialValues.images && Array.isArray(initialValues.images)) {
        setExistingImages(initialValues.images);
      }
    }
  }, [initialValues]);

  useEffect(() => {
    if (mode === "edit") dispatch(resetProductState());
  }, [mode, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed !== "" && !productData.tags.includes(trimmed)) {
      setProductData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const removeNewImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const removeExistingImage = (img) => {
    setExistingImages((prev) => prev.filter((image) => image !== img));
  };

  const handleSubmit = async () => {
    if (!productData.discount) {
      productData.percentage_Discount = 0;
      if (!productData.valid_Until_Discount) {
        productData.valid_Until_Discount = "9999-12-31";
      }
    }

    if (mode === "edit" && productData.id) {
      const updateObject = {
        ...productData,
        materials_Made: productData.materials_Made
          .split(",")
          .map((m) => m.trim()),
        countries_Available: productData.countries_Available
          .split(",")
          .map((c) => c.trim()),
        images: [...existingImages], // Add logic later to upload to AWS
      };
       const storedUser = JSON.parse(localStorage.getItem("seller"));
    // const token = storedUser?.token;
    const sellerId = storedUser?.userId;
      dispatch(updateProduct({ id: productData.id, update: updateObject, sellerId }));
    } else {
      const form = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "materials_Made" || key === "countries_Available") {
          value
            .split(",")
            .map((v) => v.trim())
            .forEach((v) => form.append(key, v));
        } else if (key === "tags") {
          value.forEach((tag) => form.append("tags", tag));
        } else {
          form.append(key, value);
        }
      });
      images.forEach((img, i) => form.append(`image_${i}`, img.file));
      dispatch(createProduct(form));
    }
  };

useEffect(() => {
  if (success) {
    if (mode === "edit" && onClose) {
      showNotification?.("Product updated successfully!");
      onClose();
      dispatch(resetProductState());
    } else {
      showNotification?.("Product added successfully!");
      setProductData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        discount: false,
        percentage_Discount: "",
        materials_Made: "",
        tags: [],
        valid_Until_Discount: "",
        processing_Time: "",
        shipping_Time: "",
        shipping_Cost: "",
        estimated_Delivery: "",
        countries_Available: "",
      });
      setImages([]);
      setExistingImages([]);
      dispatch(resetProductState());
    }
  }
}, [success, dispatch, mode, onClose, showNotification]);


  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
          mt: mode === "edit" ? -10 : 20,
        }}
      >
        <Box sx={{ margin: "auto" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, pt: 3 }}>
            {mode === "edit" ? "Update Product" : "Add New Product"}
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {success && mode !== "edit" && (
            <Typography color="primary" sx={{ mb: 2 }}>
              Product added successfully!
            </Typography>
          )}

          <Grid container spacing={3}>
            {/* Left Column – Main Details */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Package2 size={20} style={{ marginRight: 8 }} />
                  Product Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormField
                      label="Product Name"
                      name="name"
                      value={productData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      label="Description"
                      name="description"
                      value={productData.description}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        mb: 2,
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: theme.palette.custom.highlight,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: theme.palette.grey[400],
                          },
                          "&:hover fieldset": {
                            borderColor: theme.palette.text.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.palette.custom.highlight,
                          },
                        },
                      }}
                    >
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                          value={
    categories.find((cat) => cat._id === productData.category)
      ? productData.category
      : ""
  }
                        onChange={handleInputChange}
                        required
                        label="Category"
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      label="Materials"
                      name="materials_Made"
                      value={productData.materials_Made}
                      onChange={handleInputChange}
                      placeholder="Comma separated list"
                    />
                  </Grid>
                </Grid>
              </Card>

              <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                  Pricing & Inventory
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormField
                      label="Price"
                      name="price"
                      type="number"
                      value={productData.price}
                      onChange={handleInputChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                        inputProps: { min: 0 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      label="Stock"
                      name="stock"
                      type="number"
                      value={productData.stock}
                      onChange={handleInputChange}
                      required
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Custom Checkbox with highlight color */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={productData.discount}
                          onChange={handleInputChange}
                          name="discount"
                          sx={{
                            color: theme.palette.custom.highlight,
                            "&.Mui-checked": {
                              color: theme.palette.custom.highlight,
                            },
                          }}
                        />
                      }
                      label="Enable Discount"
                    />
                    {productData.discount && (
                      <Box>
                        <Box sx={{ ml: 3, mt: 2 }}>
                          <FormField
                            label="Valid Until Discount"
                            name="valid_Until_Discount"
                            type="date"
                            value={productData.valid_Until_Discount}
                            onChange={handleInputChange}
                            required={productData.discount}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        <Box sx={{ ml: 3, mt: 2 }}>
                          <FormField
                            label="Discount Percentage"
                            name="percentage_Discount"
                            type="number"
                            value={productData.percentage_Discount}
                            onChange={handleInputChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                              inputProps: { min: 0 },
                            }}
                            size="small"
                          />
                        </Box>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Card>

              <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                  Shipping Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormField
                      label="Processing Time"
                      name="processing_Time"
                      value={productData.processing_Time}
                      onChange={handleInputChange}
                      placeholder="e.g., Standard"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      label="Shipping Time"
                      name="shipping_Time"
                      value={productData.shipping_Time}
                      onChange={handleInputChange}
                      placeholder="e.g., Standard"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      label="Shipping Cost"
                      name="shipping_Cost"
                      type="number"
                      value={productData.shipping_Cost}
                      onChange={handleInputChange}
                      required
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      label="Estimated Delivery"
                      name="estimated_Delivery"
                      value={productData.estimated_Delivery}
                      onChange={handleInputChange}
                      placeholder="e.g., 5-7 days"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      label="Countries Available"
                      name="countries_Available"
                      value={productData.countries_Available}
                      onChange={handleInputChange}
                      placeholder="Comma separated list (e.g., IN, US)"
                      required
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* Right Column – Images and Tags */}
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                  Product Images
                </Typography>
                {existingImages.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Existing Images</Typography>
                    <Grid container spacing={2}>
                      {existingImages.map((img, idx) => (
                        <Grid item xs={6} key={idx}>
                          <Box
                            sx={{
                              position: "relative",
                              borderRadius: 1,
                              overflow: "hidden",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              width: "100%",
                              height: 150,
                            }}
                          >
                            <img
                              src={img}
                              alt={`Product Image ${idx + 1}`}
                              style={{
                                width: "100%",
                                height: 150,
                                objectFit: "cover",
                              }}
                            />
                            <IconButton
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 4,
                                right: 4,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.9)",
                                },
                              }}
                              onClick={() => removeExistingImage(img)}
                            >
                              <X size={16} />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-images"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="upload-images">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<ImagePlus />}
                    fullWidth
                    sx={{
                      py: 1.5,
                      backgroundColor: "#c17912",
                      color: theme.palette.common.white,
                    }}
                  >
                    Upload Images
                  </Button>
                </label>
                {images.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      {images.map((img, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              position: "relative",
                              borderRadius: 1,
                              overflow: "hidden",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              width: "100%",
                              height: 150,
                            }}
                          >
                            <img
                              src={img.preview}
                              alt={`upload-${index}`}
                              style={{
                                width: "100%",
                                height: 150,
                                objectFit: "cover",
                              }}
                            />
                            <IconButton
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 4,
                                right: 4,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.9)",
                                },
                              }}
                              onClick={() => removeNewImage(index)}
                            >
                              <X size={16} />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Card>
              <Card sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                  Product Tags
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <FormField
                    label=""
                    placeholder="Add tag"
                    name="tagInput"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Tag size={16} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#c17912",
                      color: theme.palette.common.white,
                    }}
                    onClick={addTag}
                  >
                    Add
                  </Button>
                </Stack>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {productData.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => removeTag(tag)}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Footer Submit Button */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 4, mb: 4 }}
          >
            <Button
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Save />
                )
              }
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                color: theme.palette.common.white,
                backgroundColor: theme.palette.custom.highlight,
                "&:hover": {
                  backgroundColor: theme.palette.custom.accent,
                },
              }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading
                ? mode === "edit"
                  ? "Updating..."
                  : "Saving..."
                : mode === "edit"
                ? "Update Product"
                : "Save Product"}
            </Button>
          </Box>
           <NotificationManager
          notification={notification}
          handleClose={handleCloseNotification}
        />
        </Box>
      </Box>
    </Container>
  );
};

export default AddProduct;
