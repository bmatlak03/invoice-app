import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
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
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const invoicesLength = useSelector(
    (state: RootState) => state.invoices.invoices.length
  );
  const changeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedFilter(e.target.value);
    else setSelectedFilter("");
  };
  const toggleFilterHandler = () => setFilterOpen(!filterOpen);
  const filterBtnStyles = {
    textTransform: "capitalize",
    color: theme.palette.mode === "dark" ? "white" : "black",
    fontSize: "1rem",
  };
  const filterBtnText = matches ? "Filter by status" : "Filter";
  const arrowIconStyles = {
    transform: filterOpen ? "rotate(180deg)" : "",
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
        onClick={toggleFilterHandler}
        endIcon={
          <KeyboardArrowDownIcon color="secondary" sx={arrowIconStyles} />
        }
        disabled={invoicesLength === 0}
      >
        {filterBtnText}
      </Button>
      {filterOpen && filterOptions}
    </Box>
  );
};

export default FilterInvoices;
