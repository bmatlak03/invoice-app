import { Alert, AlertTitle } from "@mui/material";
type Props = {
  type: any;
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
