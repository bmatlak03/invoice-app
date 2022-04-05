import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Box, useTheme } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
import { invoicesActions } from "../../store/invoices-slice";
import { RootState } from "../../store";
type Props = {};

const FormControls: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isEditting } = useSelector((state: RootState) => state.invoices);
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
    if (isEditting) {
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
        {isEditting ? "Cancel" : "Discard"}
      </StyledButton>

      {!isEditting && (
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
        {isEditting ? "Save Changes" : "Save and send"}
      </StyledButton>
    </Box>
  );
};
export default FormControls;
