import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInvoiceData, sendInvoiceData } from "../../store/invoices-actions";
import { invoicesActions } from "../../store/invoices-slice";
import { uiActions } from "../../store/ui-slice";
import { RootState } from "../../store";
import {
  createInvoiceData,
  createId,
  transformInvoiceObject,
} from "../../helpers/helpers";
import { ItemsType } from "../../types/types";
import { useFormik } from "formik";
import { defaultValues, validationSchema } from "./formikConfig";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import FormControls from "../FormControls/FormControls";
import Input from "../UI/Input/Input";
import StyledButton from "../UI/StyledButton/StyledButton";
import GoBackBtn from "../UI/GoBackBtn/GoBackBtn";
type Props = {
  editingInvoice?: any;
};

const InvoiceForm = ({ editingInvoice }: Props) => {
  const [items, setItems] = useState<Array<ItemsType>>([
    { name: "", quantity: 1, total: 0, price: 0, id: 0 },
  ]);
  const { isDraftMode, isEditMode } = useSelector(
    (state: RootState) => state.invoices
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema:
      isDraftMode || editingInvoice?.status === "draft"
        ? null
        : validationSchema,
    onSubmit: async (values) => {
      if (
        items.length === 0 &&
        !isDraftMode &&
        editingInvoice?.status !== "draft"
      ) {
        return alert("You must add at least 1 item!");
      } else {
        const invoiceId = isEditMode ? editingInvoice.id : createId();
        const invoiceStatus = isDraftMode
          ? "draft"
          : !editingInvoice
          ? "pending"
          : editingInvoice.status;
        const invoiceData = createInvoiceData(
          values,
          items,
          invoiceStatus,
          invoiceId
        );
        const isItemInvalid = invoiceData.items.some((item) => {
          item.total <= 0 || item.name === "";
        });
        let validate;
        if (!editingInvoice) validate = isItemInvalid && !isDraftMode;
        else if (editingInvoice) {
          if (editingInvoice.status !== "draft") {
            validate = isItemInvalid && !isDraftMode;
          } else {
            validate = false;
          }
        }
        if (validate) {
          return alert("Item's input can't be empty");
        } else if (isEditMode) {
          dispatch(editInvoiceData(invoiceData));
        } else {
          dispatch(sendInvoiceData(invoiceData));
        }
      }
    },
  });
  const { setFieldValue } = formik;

  useEffect(() => {
    if (isEditMode) {
      const transformedInvoice = transformInvoiceObject(editingInvoice);
      if (transformedInvoice) {
        for (const [field, value] of Object.entries(transformedInvoice)) {
          setFieldValue(field, value);
        }
        console.log(editingInvoice.items);
        setItems(editingInvoice.items);
      }
    }
  }, [editingInvoice, isEditMode, setFieldValue]);
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
    const newItems = items.map((item) => {
      if (item.id === id) return { ...item, name: e.target.value };
      return item;
    });
    setItems(newItems);
  };
  const changeItemQty = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = items.map((item) => {
      if (item.id === id) return { ...item, quantity: +e.target.value };
      return item;
    });
    setItems(newItems);
  };
  const changeItemPrice = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = items.map((item) => {
      if (item.id === id) return { ...item, price: +e.target.value };
      return item;
    });
    setItems(newItems);
  };
  const deleteItemHandler = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const handleCloseForm = () => {
    dispatch(uiActions.closeForm());
    if (isEditMode) {
      dispatch(invoicesActions.cancelEdit());
    }
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
    overflowX: "hidden",
    borderRadiusBottom: "10px",
    backgroundColor: theme.palette.background.default,
  };
  const inputsContainterStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 5,
  };
  return (
    <form onSubmit={formik.handleSubmit} style={formStyles}>
      <Box sx={{ padding: matches ? 4 : 2 }}>
        {!matches && <GoBackBtn click={handleCloseForm} />}
        <Typography mb={1} variant="h5" fontWeight="bold">
          {isEditMode ? `Edit #${editingInvoice?.id}` : "New Invoice"}
        </Typography>
        <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
          Bill From
        </Typography>
        <Input
          name="streetAddress"
          label="Street Address"
          fullWidth
          error={
            formik.touched.streetAddress && Boolean(formik.errors.streetAddress)
          }
          helperText={
            formik.touched.streetAddress && formik.errors.streetAddress
          }
          value={formik.values.streetAddress}
          change={formik.handleChange}
        />
        <Box sx={inputsContainterStyles}>
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
          <Input
            name="postCode"
            label="Post Code"
            styles={{ width: matches ? "30%" : "45%" }}
            fullWidth={false}
            error={formik.touched.postCode && Boolean(formik.errors.postCode)}
            helperText={formik.touched.postCode && formik.errors.postCode}
            value={formik.values.postCode}
            change={formik.handleChange}
          />
          <Input
            styles={{ width: matches ? "30%" : "100%" }}
            name="country"
            label="Country"
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            value={formik.values.country}
            change={formik.handleChange}
          />
        </Box>{" "}
        <Typography mb={1} variant="h6" color="secondary" fontWeight={500}>
          Bill To
        </Typography>
        <Input
          name="clientName"
          label="Client's Name"
          fullWidth
          error={formik.touched.clientName && Boolean(formik.errors.clientName)}
          helperText={formik.touched.clientName && formik.errors.clientName}
          value={formik.values.clientName}
          change={formik.handleChange}
        />
        <Input
          name="clientEmail"
          label="Client's Email"
          fullWidth
          error={
            formik.touched.clientEmail && Boolean(formik.errors.clientEmail)
          }
          helperText={formik.touched.clientEmail && formik.errors.clientEmail}
          value={formik.values.clientEmail}
          change={formik.handleChange}
        />
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
        <Box sx={inputsContainterStyles}>
          <Input
            name="clientCity"
            label="City"
            styles={{ width: matches ? "30%" : "45%", marginBottom: 5 }}
            fullWidth={false}
            error={
              formik.touched.clientCity && Boolean(formik.errors.clientCity)
            }
            helperText={formik.touched.clientCity && formik.errors.clientCity}
            value={formik.values.clientCity}
            change={formik.handleChange}
          />

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
        </Box>{" "}
        <Box sx={inputsContainterStyles}>
          <DatePicker
            label="Date"
            disabled={isEditMode}
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
            <InputLabel id="paymentTerms">Payment Terms</InputLabel>
            <Select
              name="paymentTerms"
              labelId="paymentTerms"
              id="paymentTerms"
              value={formik.values.paymentTerms}
              label="Payment Terms"
              onChange={formik.handleChange}
              color="secondary"
            >
              <MenuItem value={1}>Net 1 Day</MenuItem>
              <MenuItem value={7}>Net 7 Days</MenuItem>
              <MenuItem value={14}>Net 14 Days</MenuItem>
              <MenuItem value={30}>Net 30 Days</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          type={theme.palette.mode === "dark" ? "grey" : "light"}
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
export default InvoiceForm;
