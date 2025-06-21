import React from 'react';
import { TextField, useTheme } from '@mui/material';

function FormField({
    name,
    label,
    placeholder,
    type = 'text',
    register,
    error,
    helperText,
    autoComplete,
    validationRules,
    multiline,
    rows,
    fullWidth = true,
    onChange,
    value,
    InputProps,
    size,
    required = false,
    disabled = false,
    InputLabelProps
}) {
    const theme = useTheme();

    // Use the provided name or fallback to a normalized label
    const fieldName = name || label.toLowerCase().replace(/\s/g, '');

    // Special handling for date inputs
    const dateInputProps = type === 'date' ? {
        placeholder: '',
    } : {};

    return (
        <TextField
            name={fieldName}
            label={label}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error ? error.message : helperText}
            autoComplete={autoComplete}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            required={required}
            disabled={disabled}
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
            size={size}
            {...dateInputProps}
            {...(register && register(fieldName, validationRules))}
            sx={{
                '& label.Mui-focused': {
                    color: theme.palette.custom.highlight,
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.custom.highlight,
                    },
                },
                mb: 2
            }}
        />
    );
}

export default FormField;