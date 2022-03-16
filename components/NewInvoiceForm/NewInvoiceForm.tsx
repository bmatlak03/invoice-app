import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { sendInvoiceData } from "../../store/invoices-actions";
import { useFormik } from "formik";
import { defaultValues, validationSchema } from "./formikConfig";
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
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import FormControls from "../FormControls/FormControls";
import Input from "../UI/Input/Input";
import StyledButton from "../UI/StyledButton/StyledButton";
import { uiActions } from "../../store/ui-slice";
type Props = {};

const NewInvoiceForm: React.FC<Props> = ({}) => {
  const [items, setItems] = useState([
    { name: "", quantity: 1, total: 0, price: 0, id: 0 },
  ]);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (items.length === 0) {
        return alert("You must add at least 1 item!");
      } else {
        let totalPrice = 0;
        const itemsCopy = [...items];
        itemsCopy.forEach((item) => {
          item.total = item.quantity * item.price;
          totalPrice += item.total;
        });
        const newInvoiceData = {
          ...values,
          id: "",
          items: itemsCopy,
          total: totalPrice,
        };
        const isInputEmpty = newInvoiceData.items.some(
          (item) => item.total <= 0 || item.name === ""
        );

        if (isInputEmpty) {
          return alert("Item's input can't be empty");
        } else {
          dispatch(sendInvoiceData(newInvoiceData));
        }
      }
    },
  });
  const addNewItem = () => {
    setItems((prevState) => [
      ...items,
      {
        id: prevState.length === 0 ? 0 : prevState[prevState.length - 1].id + 1,
        name: "",
        quantity: 1,
        total: 0,
        price: 0,
      },
    ]);
  };
  const changeItemName = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = [...items];
    newItems[id].name = e.target.value;
    setItems(newItems);
  };
  const changeItemQty = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = [...items];
    newItems[id].quantity = +e.target.value;
    setItems(newItems);
  };
  const changeItemPrice = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = [...items];
    newItems[id].price = +e.target.value;
    setItems(newItems);
  };
  const deleteItemHandler = (id: number) => {
    const itemsCopy = [...items];
    const filteredItems = itemsCopy.filter((item) => item.id !== id);
    setItems(filteredItems);
  };
  const formStyles: {} = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
    width: matches ? "500px" : "100%",
    height: "calc(100vh - 60px)",
    overflowY: "scroll",
    borderRadiusBottom: "10px",
    backgroundColor: theme.palette.background.default,
  };
  const inputsContainterStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 5,
  };
  const goBackBtn = (
    <Button
      sx={{
        textTransform: "capitalize",
        color: theme.palette.mode === "dark" ? "white" : "black",
        fontSize: "1rem",
      }}
      onClick={() => dispatch(uiActions.closeForm())}
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
      <Box sx={{ padding: matches ? 4 : 2 }}>
        {!matches && goBackBtn}
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
              error={
                formik.touched.streetAddress &&
                Boolean(formik.errors.streetAddress)
              }
              helperText={
                formik.touched.streetAddress && formik.errors.streetAddress
              }
              value={formik.values.streetAddress}
              change={formik.handleChange}
            />
          ),
          [
            formik.values.streetAddress,
            formik.handleChange,
            formik.touched.streetAddress,
            formik.errors.streetAddress,
          ]
        )}
        <Box sx={inputsContainterStyles}>
          {useMemo(
            () => (
              <Input
                name="city"
                label="City"
                styles={{ width: matches ? "30%" : "45%", marginBottom: 5 }}
                fullWidth={false}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                value={formik.values.city}
                change={formik.handleChange}
              />
            ),
            [
              formik.values.city,
              formik.handleChange,
              matches,
              formik.errors.city,
              formik.touched.city,
            ]
          )}
          {useMemo(
            () => (
              <Input
                name="postCode"
                label="Post Code"
                styles={{ width: matches ? "30%" : "45%" }}
                fullWidth={false}
                error={
                  formik.touched.postCode && Boolean(formik.errors.postCode)
                }
                helperText={formik.touched.postCode && formik.errors.postCode}
                value={formik.values.postCode}
                change={formik.handleChange}
              />
            ),
            [
              formik.values.postCode,
              formik.handleChange,
              matches,
              formik.touched.postCode,
              formik.errors.postCode,
            ]
          )}
          {useMemo(
            () => (
              <Input
                styles={{ width: matches ? "30%" : "100%" }}
                name="country"
                label="Country"
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                value={formik.values.country}
                change={formik.handleChange}
              />
            ),
            [
              formik.values.country,
              formik.handleChange,
              matches,
              formik.errors.country,
              formik.touched.country,
            ]
          )}
        </Box>{" "}
        <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
          Bill To
        </Typography>
        {useMemo(
          () => (
            <Input
              name="clientName"
              label="Client's Name"
              fullWidth
              error={
                formik.touched.clientName && Boolean(formik.errors.clientName)
              }
              helperText={formik.touched.clientName && formik.errors.clientName}
              value={formik.values.clientName}
              change={formik.handleChange}
            />
          ),
          [
            formik.values.clientName,
            formik.handleChange,
            formik.touched.clientName,
            formik.errors.clientName,
          ]
        )}
        {useMemo(
          () => (
            <Input
              name="clientEmail"
              label="Client's Email"
              fullWidth
              error={
                formik.touched.clientEmail && Boolean(formik.errors.clientEmail)
              }
              helperText={
                formik.touched.clientEmail && formik.errors.clientEmail
              }
              value={formik.values.clientEmail}
              change={formik.handleChange}
            />
          ),
          [
            formik.values.clientEmail,
            formik.handleChange,
            formik.touched.clientEmail,
            formik.errors.clientEmail,
          ]
        )}
        {useMemo(
          () => (
            <Input
              name="clientStreetAddress"
              label="Street Address"
              fullWidth
              error={
                formik.touched.clientStreetAddress &&
                Boolean(formik.errors.clientStreetAddress)
              }
              helperText={
                formik.touched.clientStreetAddress &&
                formik.errors.clientStreetAddress
              }
              value={formik.values.clientStreetAddress}
              change={formik.handleChange}
            />
          ),
          [
            formik.values.clientStreetAddress,
            formik.handleChange,
            formik.touched.clientStreetAddress,
            formik.errors.clientStreetAddress,
          ]
        )}
        <Box sx={inputsContainterStyles}>
          {useMemo(
            () => (
              <Input
                name="clientCity"
                label="City"
                styles={{ width: matches ? "30%" : "45%", marginBottom: 5 }}
                fullWidth={false}
                error={
                  formik.touched.clientCity && Boolean(formik.errors.clientCity)
                }
                helperText={
                  formik.touched.clientCity && formik.errors.clientCity
                }
                value={formik.values.clientCity}
                change={formik.handleChange}
              />
            ),
            [
              formik.values.clientCity,
              formik.handleChange,
              matches,
              formik.touched.clientCity,
              formik.errors.clientCity,
            ]
          )}
          {useMemo(
            () => (
              <Input
                name="clientPostCode"
                label="Post Code"
                styles={{ width: matches ? "30%" : "45%", marginBottom: 5 }}
                fullWidth={false}
                error={
                  formik.touched.clientPostCode &&
                  Boolean(formik.errors.clientPostCode)
                }
                helperText={
                  formik.touched.clientPostCode && formik.errors.clientPostCode
                }
                value={formik.values.clientPostCode}
                change={formik.handleChange}
              />
            ),
            [
              formik.values.clientPostCode,
              formik.handleChange,
              matches,
              formik.touched.clientPostCode,
              formik.errors.clientPostCode,
            ]
          )}
          {useMemo(
            () => (
              <Input
                name="clientCountry"
                label="Country"
                styles={{ width: matches ? "30%" : "100%" }}
                error={
                  formik.touched.clientCountry &&
                  Boolean(formik.errors.clientCountry)
                }
                helperText={
                  formik.touched.clientCountry && formik.errors.clientCountry
                }
                value={formik.values.clientCountry}
                change={formik.handleChange}
              />
            ),
            [
              formik.values.clientCountry,
              formik.handleChange,
              matches,
              formik.touched.clientCountry,
              formik.errors.clientCountry,
            ]
          )}
        </Box>{" "}
        <Box sx={inputsContainterStyles}>
          <DatePicker
            label="Date"
            value={formik.values.date}
            onChange={(value) => formik.setFieldValue("date", value)}
            renderInput={(params) => (
              <TextField
                name="date"
                sx={{ marginBottom: 4, width: matches ? "45%" : "100%" }}
                {...params}
                color="secondary"
                fullWidth={matches ? true : false}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            )}
          />
          <FormControl fullWidth sx={{ width: matches ? "45%" : "100%" }}>
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
        </Box>
        {useMemo(
          () => (
            <Input
              name="projectDescription"
              label="Project Description"
              fullWidth
              error={
                formik.touched.projectDescription &&
                Boolean(formik.errors.projectDescription)
              }
              helperText={
                formik.touched.projectDescription &&
                formik.errors.projectDescription
              }
              value={formik.values.projectDescription}
              change={formik.handleChange}
            />
          ),
          [
            formik.values.projectDescription,
            formik.handleChange,
            formik.touched.projectDescription,
            formik.errors.projectDescription,
          ]
        )}
        <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
          Item List
        </Typography>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 5,
              alignItems: "center",
            }}
          >
            <Input
              label="Item Name"
              value={item.name}
              styles={{ marginRight: 1 }}
              change={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeItemName(item.id, e)
              }
            />

            <Input
              type="number"
              name="quantity"
              label="Qty."
              styles={{ width: "20%", marginRight: 1 }}
              value={item.quantity}
              change={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeItemQty(item.id, e)
              }
            />
            <Input
              type="number"
              name="price"
              styles={{ width: "30%", marginRight: 1 }}
              label="Price"
              value={item.price}
              change={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeItemPrice(item.id, e)
              }
            />
            <Input
              label="Total"
              styles={{ width: "30%" }}
              value={item.quantity * item.price}
              inputProps={{
                readOnly: true,
              }}
            />
            <IconButton onClick={() => deleteItemHandler(item.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <StyledButton
          type="discard"
          customStyles={{ width: "100%" }}
          onClick={addNewItem}
        >
          + add new item
        </StyledButton>
      </Box>
      <FormControls />
    </form>
  );
};
export default NewInvoiceForm;
