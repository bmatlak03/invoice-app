import { TextField } from "@mui/material";
import React from "react";
type Props = {
  styles?: object;
  label: string;
  fullWidth?: boolean;
  value: string | number;
  change?: any;
  name?: string;
  type?: string;
  inputProps?: object;
};

const Input = (props: Props) => {
  const { label, styles, fullWidth, value, change, name, type, inputProps } =
    props;
  const defaultStyles = {
    marginBottom: 5,
  };
  return (
    <TextField
      name={name}
      sx={styles ? styles : defaultStyles}
      variant="outlined"
      label={label}
      fullWidth={fullWidth}
      color="secondary"
      value={value}
      onChange={change}
      type={type ? type : "string"}
      inputProps={inputProps}
    />
  );
};
export default Input;
