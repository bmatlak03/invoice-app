import { TextField } from "@mui/material";
type Props = {
  styles?: object;
  label: string;
  fullWidth?: boolean;
};

const Input = ({ label, styles, fullWidth }: Props) => {
  const defaultStyles = {
    marginBottom: 5,
  };
  return (
    <TextField
      sx={styles ? styles : defaultStyles}
      variant="outlined"
      label={label}
      fullWidth={fullWidth}
    />
  );
};
export default Input;
