import { useDispatch } from "react-redux";
import { invoicesActions } from "../../store/invoices-slice";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import Input from "../UI/Input/Input";
type Props = {};

const NewInvoiceForm = ({}: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const formStyles: {} = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "4%",
    backgroundColor: theme.palette.background.default,
  };
  const goBackBtn = (
    <Button
      sx={{
        textTransform: "capitalize",
        color: theme.palette.mode === "dark" ? "white" : "black",
        fontSize: "1rem",
      }}
      onClick={() => dispatch(invoicesActions.closeForm())}
      startIcon={
        <KeyboardArrowDownIcon
          color="secondary"
          sx={{
            transform: "rotate(90deg)",
          }}
        />
      }
    >
      Go back
    </Button>
  );
  const cityPostCode = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 5,
      }}
    >
      <Input label="City" styles={{ width: "45%" }} fullWidth={false} />
      <Input label="Post Code" styles={{ width: "45%" }} fullWidth={false} />
    </Box>
  );
  return (
    <form action="" style={formStyles}>
      {goBackBtn}
      <Typography mb={1} variant="h5" fontWeight="bold">
        New Invoice
      </Typography>
      <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
        Bill From
      </Typography>
      <Input label="Street Address" fullWidth />
      {cityPostCode}
      <Input label="Country" fullWidth />
      <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
        Bill To
      </Typography>
      <Input label="Client's Name" fullWidth />
      <Input label="Client's Email" fullWidth />
      {cityPostCode}
      <Input label="Country" fullWidth />
    </form>
  );
};
export default NewInvoiceForm;
