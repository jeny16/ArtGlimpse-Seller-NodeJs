import { styled } from "@mui/material/styles";
import {
    Box,
    TableHead,
    TableCell,
    Card,
    InputBase,
    TextField
} from "@mui/material";

// Main container with the primary background
export const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(16),
    marginTop: theme.spacing(16),
}));

// Styled components for the table header
export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.custom.highlight,
}));

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '1rem',
}));

// Styled input component to remove spinner arrows
export const NumberInput = styled(InputBase)(({ theme }) => ({
    '& input': {
        padding: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '&[type=number]': {
            '-moz-appearance': 'textfield',
        },
    },
}));

// Styled card for stats
export const StatsCard = styled(Card)(({ theme }) => ({
    height: '100%',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[10],
    },
}));

// Search field styling
export const SearchField = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.shades?.medium || theme.palette.grey[300],
        },
        '&:hover fieldset': {
            borderColor: theme.palette.custom.highlight,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.custom.highlight,
        },
    },
}));

// Product name with ellipsis for overflow
export const TruncatedTypography = styled(Box)(({ theme }) => ({
    width: '100%',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.2em',
    maxHeight: '2.4em', // 2 lines
}));