import { useDispatch } from "react-redux";
import { invoicesActions } from "../../store/invoices-slice";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import Input from "../UI/Input/Input";
import { useFormik } from "formik";
// import * as yup from "yup";
type Props = {};

const NewInvoiceForm = ({}: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
      clientName: "",
      clientEmail: "",
      clientCity: "",
      clientPostCode: "",
      clientCountry: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
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

  return (
    <form onSubmit={formik.handleSubmit} style={formStyles}>
      {goBackBtn}
      <Typography mb={1} variant="h5" fontWeight="bold">
        New Invoice
      </Typography>
      <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
        Bill From
      </Typography>
      <Input
        name="streetAddress"
        label="Street Address"
        fullWidth
        value={formik.values.streetAddress}
        change={formik.handleChange}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Input
          name="city"
          label="City"
          styles={{ width: "45%" }}
          fullWidth={false}
          value={formik.values.city}
          change={formik.handleChange}
        />
        <Input
          name="postCode"
          label="Post Code"
          styles={{ width: "45%" }}
          fullWidth={false}
          value={formik.values.postCode}
          change={formik.handleChange}
        />
      </Box>{" "}
      <Input
        name="country"
        label="Country"
        fullWidth
        value={formik.values.country}
        change={formik.handleChange}
      />
      <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
        Bill To
      </Typography>
      <Input
        name="clientName"
        label="Client's Name"
        fullWidth
        value={formik.values.clientName}
        change={formik.handleChange}
      />
      <Input
        name="clientEmail"
        label="Client's Email"
        fullWidth
        value={formik.values.clientEmail}
        change={formik.handleChange}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Input
          name="clientCity"
          label="City"
          styles={{ width: "45%" }}
          fullWidth={false}
          value={formik.values.clientCity}
          change={formik.handleChange}
        />
        <Input
          name="clientPostCode"
          label="Post Code"
          styles={{ width: "45%" }}
          fullWidth={false}
          value={formik.values.clientPostCode}
          change={formik.handleChange}
        />
      </Box>{" "}
      <Input
        name="clientCountry"
        label="Country"
        fullWidth
        value={formik.values.clientCountry}
        change={formik.handleChange}
      />
      <button>test</button>
    </form>
  );
};
export default NewInvoiceForm;
