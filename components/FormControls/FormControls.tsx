import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Box, useTheme } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
type Props = {};

const FormControls: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
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
  return (
    <Box sx={formControlsContainerStyles}>
      <StyledButton
        type="light"
        customStyles={buttonHeight}
        onClick={() => dispatch(uiActions.closeForm())}
      >
        Discard
      </StyledButton>
      <StyledButton type="grey" customStyles={buttonHeight}>
        Save as draft
      </StyledButton>
      <StyledButton type="send" role="submit" customStyles={buttonHeight}>
        Save and send
      </StyledButton>
    </Box>
  );
};
export default FormControls;
