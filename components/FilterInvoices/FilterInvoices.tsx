import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { invoicesActions } from "../../store/invoices-slice";
import { uiActions } from "../../store/ui-slice";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material/";
import { InvoiceStatus } from "../../constants";

const FilterInvoices = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectedFilter, setSelectedFilter] = useState("");
  const { isFilterOpen } = useSelector((state: RootState) => state.ui);
  const changeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedFilter(e.target.value);
      dispatch(invoicesActions.setFilter(e.target.value));
    } else {
      setSelectedFilter("");
      dispatch(invoicesActions.setFilter(""));
    }
  };
  const filterBtnStyles = {
    textTransform: "capitalize",
    color: theme.palette.mode === "dark" ? "white" : "black",
    fontSize: "1rem",
  };
  const filterBtnText = matches ? "Filter by status" : "Filter";
  const arrowIconStyles = {
    transform: isFilterOpen ? "rotate(180deg)" : "",
    transition: "0.1s",
  };
  const formOptionsStyles = {
    zIndex: 1,
    position: "absolute",
    top: "105%",
    left: "-25%",
    padding: "5px 30px",
    bgcolor: theme.palette.background.default,
    borderRadius: "15px",
    boxShadow: "1px 6px 19px -4px black",
  };
  const filterOptions = (
    <FormControl onChange={changeStatusHandler} sx={formOptionsStyles}>
      <FormControlLabel
        value={InvoiceStatus.Draft}
        control={
          <Checkbox
            size="small"
            color="secondary"
            checked={selectedFilter === InvoiceStatus.Draft}
          />
        }
        label="Draft"
      />
      <FormControlLabel
        value={InvoiceStatus.Pending}
        control={
          <Checkbox
            size="small"
            color="secondary"
            checked={selectedFilter === InvoiceStatus.Pending}
          />
        }
        label={InvoiceStatus.Pending}
      />
      <FormControlLabel
        value={InvoiceStatus.Paid}
        control={
          <Checkbox
            size="small"
            color="secondary"
            checked={selectedFilter === InvoiceStatus.Paid}
          />
        }
        label="Paid"
      />
    </FormControl>
  );
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Button
        sx={filterBtnStyles}
        onClick={() => dispatch(uiActions.toggleFilter())}
        endIcon={
          <KeyboardArrowDownIcon color="secondary" sx={arrowIconStyles} />
        }
      >
        {filterBtnText}
      </Button>
      {isFilterOpen && filterOptions}
    </Box>
  );
};

export default FilterInvoices;
