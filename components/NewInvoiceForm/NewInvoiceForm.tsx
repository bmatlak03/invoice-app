import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { invoicesActions } from "../../store/invoices-slice";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import FormControls from "../FormControls/FormControls";
import Input from "../UI/Input/Input";
import { useMemo } from "react";
type Props = {};

const NewInvoiceForm: React.FC<Props> = ({}) => {
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
      date: new Date(),
      paymentTerms: 1,
      projectDescription: "",
    },
    validationSchema: yup.object().shape({
      date: yup.date().nullable(),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(invoicesActions.createNewInvoice(values));
    },
  });
  const formStyles: {} = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    minHeight: "100%",

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
      <Box sx={{ padding: 2 }}>
        {goBackBtn}
        <Typography mb={1} variant="h5" fontWeight="bold">
          New Invoice
        </Typography>
        <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
          Bill From
        </Typography>
        {useMemo(
          () => (
            <Input
              name="streetAddress"
              label="Street Address"
              fullWidth
              value={formik.values.streetAddress}
              change={formik.handleChange}
            />
          ),
          [formik.values.streetAddress, formik.handleChange]
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          {useMemo(
            () => (
              <Input
                name="city"
                label="City"
                styles={{ width: "45%" }}
                fullWidth={false}
                value={formik.values.city}
                change={formik.handleChange}
              />
            ),
            [formik.values.city, formik.handleChange]
          )}
          {useMemo(
            () => (
              <Input
                name="postCode"
                label="Post Code"
                styles={{ width: "45%" }}
                fullWidth={false}
                value={formik.values.postCode}
                change={formik.handleChange}
              />
            ),
            [formik.values.postCode, formik.handleChange]
          )}
        </Box>{" "}
        {useMemo(
          () => (
            <Input
              name="country"
              label="Country"
              fullWidth
              value={formik.values.country}
              change={formik.handleChange}
            />
          ),
          [formik.values.country, formik.handleChange]
        )}
        <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
          Bill To
        </Typography>
        {useMemo(
          () => (
            <Input
              name="clientName"
              label="Client's Name"
              fullWidth
              value={formik.values.clientName}
              change={formik.handleChange}
            />
          ),
          [formik.values.clientName, formik.handleChange]
        )}
        {useMemo(
          () => (
            <Input
              name="clientEmail"
              label="Client's Email"
              fullWidth
              value={formik.values.clientEmail}
              change={formik.handleChange}
            />
          ),
          [formik.values.clientEmail, formik.handleChange]
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          {useMemo(
            () => (
              <Input
                name="clientCity"
                label="City"
                styles={{ width: "45%" }}
                fullWidth={false}
                value={formik.values.clientCity}
                change={formik.handleChange}
              />
            ),
            [formik.values.clientCity, formik.handleChange]
          )}
          {useMemo(
            () => (
              <Input
                name="clientPostCode"
                label="Post Code"
                styles={{ width: "45%" }}
                fullWidth={false}
                value={formik.values.clientPostCode}
                change={formik.handleChange}
              />
            ),
            [formik.values.clientPostCode, formik.handleChange]
          )}
        </Box>{" "}
        {useMemo(
          () => (
            <Input
              name="clientCountry"
              label="Country"
              fullWidth
              value={formik.values.clientCountry}
              change={formik.handleChange}
            />
          ),
          [formik.values.clientCountry, formik.handleChange]
        )}
        <DatePicker
          label="Date"
          value={formik.values.date}
          onChange={(value) => formik.setFieldValue("date", value)}
          renderInput={(params) => (
            <TextField
              name="date"
              sx={{ marginBottom: 4 }}
              {...params}
              color="secondary"
              fullWidth
            />
          )}
        />
        <FormControl fullWidth sx={{ marginBottom: 4 }}>
          <InputLabel id="payment-terms">Payment Terms</InputLabel>
          <Select
            labelId="payment-terms"
            id="payment-terms"
            value={formik.values.paymentTerms}
            label="Payment Terms"
            onChange={(e) =>
              formik.setFieldValue("paymentTerms", e.target.value)
            }
            color="secondary"
          >
            <MenuItem value={1}>Net 1 Day</MenuItem>
            <MenuItem value={7}>Net 7 Days</MenuItem>
            <MenuItem value={14}>Net 14 Days</MenuItem>
            <MenuItem value={30}>Net 30 Days</MenuItem>
          </Select>
        </FormControl>
        {useMemo(
          () => (
            <Input
              name="projectDescription"
              label="Project Description"
              fullWidth
              value={formik.values.projectDescription}
              change={formik.handleChange}
            />
          ),
          [formik.values.projectDescription, formik.handleChange]
        )}
        <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
          Item List
        </Typography>
      </Box>
      <FormControls />
    </form>
  );
};
export default NewInvoiceForm;
