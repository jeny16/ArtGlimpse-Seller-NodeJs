// Constants for the inventory component
export const STOCK_STATUS = {
    IN_STOCK: "In Stock",
    LOW_STOCK: "Low Stock",
    OUT_OF_STOCK: "Out of Stock"
};

export const STOCK_STATUS_COLORS = {
    [STOCK_STATUS.IN_STOCK]: "success",
    [STOCK_STATUS.LOW_STOCK]: "warning",
    [STOCK_STATUS.OUT_OF_STOCK]: "error"
};

export const ROW_HEIGHT = 72;
export const NAME_MAX_LENGTH = 60; // Characters to truncate product names