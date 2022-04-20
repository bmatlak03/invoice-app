import { Alert, AlertColor, AlertTitle } from "@mui/material";
type Props = {
  type: AlertColor;
  message: string;
};

const Notification = ({ type, message }: Props) => {
  return (
    <Alert variant="outlined" severity={type}>
      <AlertTitle sx={{ textTransform: "capitalize" }}>{type}</AlertTitle>
      {message}
    </Alert>
  );
};
export default Notification;
