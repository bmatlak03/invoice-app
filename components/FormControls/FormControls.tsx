import { useDispatch, useSelector } from "react-redux";
import { invoicesActions } from "../../store/invoices-slice";
import { RootState } from "../../store";
import { uiActions } from "../../store/ui-slice";
import { Box, useTheme } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";

const FormControls = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isEditMode } = useSelector((state: RootState) => state.invoices);
  const formControlsContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "80px",
    padding: "2%",
    backgroundColor: theme.palette.primary.light,
  };
  const buttonHeight = { height: "50px" };
  const handleCloseForm = () => {
    dispatch(uiActions.closeForm());
    if (isEditMode) {
      dispatch(invoicesActions.cancelEdit());
    }
  };
  return (
    <Box sx={formControlsContainerStyles}>
      <StyledButton
        type="light"
        customStyles={buttonHeight}
        onClick={handleCloseForm}
      >
        {isEditMode ? "Cancel" : "Discard"}
      </StyledButton>

      {!isEditMode && (
        <StyledButton
          type="grey"
          role="submit"
          onClick={() => dispatch(invoicesActions.saveAsDraft())}
          customStyles={buttonHeight}
        >
          Save as draft
        </StyledButton>
      )}
      <StyledButton type="send" role="submit" customStyles={buttonHeight}>
        {isEditMode ? "Save Changes" : "Save and send"}
      </StyledButton>
    </Box>
  );
};
export default FormControls;
