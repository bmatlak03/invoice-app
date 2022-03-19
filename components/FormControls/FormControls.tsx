import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Box } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
type Props = {};

const FormControls: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const formControlsContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "80px",
    padding: "2%",
    backgroundColor: "#1E2139",
  };
  const buttonHeight = { height: "50px" };
  return (
    <Box sx={formControlsContainerStyles}>
      <StyledButton
        type="discard"
        customStyles={buttonHeight}
        onClick={() => dispatch(uiActions.closeForm())}
      >
        Discard
      </StyledButton>
      <StyledButton type="draft" customStyles={buttonHeight}>
        Save as draft
      </StyledButton>
      <StyledButton type="send" role="submit" customStyles={buttonHeight}>
        Save and send
      </StyledButton>
    </Box>
  );
};
export default FormControls;
