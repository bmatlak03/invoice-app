import { Box } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
type Props = {};

const FormControls: React.FC<Props> = ({}) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "space-between",
      }}
    >
      <StyledButton type="discard" customStyles={{ height: "50px" }}>
        Discard
      </StyledButton>
      <StyledButton type="draft" customStyles={{ height: "50px" }}>
        Save as draft
      </StyledButton>
      <StyledButton type="send" role="submit" customStyles={{ height: "50px" }}>
        Save and send
      </StyledButton>
    </Box>
  );
};
export default FormControls;
