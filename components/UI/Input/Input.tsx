import { TextField } from "@mui/material";
type Props = {
  styles?: object;
  label: string;
  fullWidth?: boolean;
  value: string;
  change: any;
  name?: string;
};

const Input = ({ label, styles, fullWidth, value, change, name }: Props) => {
  const defaultStyles = {
    marginBottom: 5,
  };
  console.log("rendering <Input /> ");
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
    />
  );
};
export default Input;
