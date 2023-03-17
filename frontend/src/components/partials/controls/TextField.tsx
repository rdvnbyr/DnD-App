import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type InputProps = TextFieldProps & {};
export const FormTextField = React.forwardRef(
  ({ variant = 'standard', label, error, helperText, ...restProps }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <TextField
        ref={ref}
        variant={variant}
        label={label}
        error={!!error}
        helperText={helperText}
        fullWidth
        {...restProps}
      />
    );
  }
);
