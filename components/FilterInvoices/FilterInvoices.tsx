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
type Props = {};

const FilterInvoices: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const invoicesLength = useSelector(
    (state: RootState) => state.invoices.currentInvoices.length
  );
  const { isFilterOpen } = useSelector((state: RootState) => state.ui);
  const changeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedFilter(e.target.value);
      dispatch(invoicesActions.filterInvoiceByStatus(e.target.value));
    } else {
      setSelectedFilter("");
      dispatch(invoicesActions.filterInvoiceByStatus("any"));
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
        value="draft"
        control={
          <Checkbox
            size="small"
            color="secondary"
            checked={selectedFilter === "draft"}
          />
        }
        label="Draft"
      />
      <FormControlLabel
        value="pending"
        control={
          <Checkbox
            size="small"
            color="secondary"
            checked={selectedFilter === "pending"}
          />
        }
        label="Pending"
      />
      <FormControlLabel
        value="paid"
        control={
          <Checkbox
            size="small"
            color="secondary"
            checked={selectedFilter === "paid"}
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
