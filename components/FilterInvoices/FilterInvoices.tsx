import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  useTheme,
} from "@mui/material";
type Props = {};

const FilterInvoices: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [selectValue, setSelectValue] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const changeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setSelectValue(e.target.value);
    } else {
      setSelectValue("");
    }
  };
  const toggleFilterHandler = () => setFilterOpen(!filterOpen);
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        sx={{
          textTransform: "capitalize",
          color: theme.palette.mode === "dark" ? "white" : "black",
          fontSize: "1rem",
        }}
        onClick={toggleFilterHandler}
        endIcon={
          <KeyboardArrowDownIcon
            color="secondary"
            sx={{
              transform: filterOpen ? "rotate(180deg)" : "",
              transition: "0.1s",
            }}
          />
        }
      >
        Filter
      </Button>
      {filterOpen && (
        <FormControl
          onChange={changeStatusHandler}
          sx={{
            position: "absolute",
            padding: "5px 30px",
            top: "105%",
            left: "-25%",
            boxShadow: "1px 6px 19px -4px black",
            borderRadius: "15px",
          }}
        >
          <FormControlLabel
            value="draft"
            control={
              <Checkbox
                size="small"
                color="secondary"
                checked={selectValue === "draft"}
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
                checked={selectValue === "pending"}
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
                checked={selectValue === "paid"}
              />
            }
            label="Paid"
          />
        </FormControl>
      )}
    </Box>
  );
};

export default FilterInvoices;
