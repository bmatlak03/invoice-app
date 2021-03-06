import { memo } from "react";
import { TextField } from "@mui/material";
type Props = {
  styles?: object;
  label: string;
  fullWidth?: boolean;
  value: string | number;
  change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  inputProps?: object;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
};

const Input = (props: Props) => {
  const {
    label,
    styles,
    fullWidth,
    value,
    change,
    name,
    type,
    inputProps,
    error,
    helperText,
  } = props;
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
      error={error}
      helperText={helperText}
      onChange={change}
      type={type ? type : "string"}
      inputProps={inputProps}
    />
  );
};
export default memo(Input);
