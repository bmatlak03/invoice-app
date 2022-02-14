import { Button, Box, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
type Props = {
  type: string;
  click: () => void;
};

const StyledButton: React.FC<Props> = ({ children, type, click }) => {
  const theme = useTheme();
  const StartIcon =
    type === "add" ? (
      <Box
        sx={{
          background: "white",
          width: "25px",
          height: "25px",
          borderRadius: "50px",
        }}
      >
        <Add sx={{ color: theme.palette.secondary.main }} />
      </Box>
    ) : null;
  const buttonStyles: {} = {
    backgroundColor: theme.palette.secondary.main,
    fontWeight: "bold",
    color: "white",
    borderRadius: "50px",
    border: "none",
    textTransform: "capitalize",
    width: "100px",
    "&:hover": {
      border: "none",
      backgroundColor: type === "add" && "#9277FF",
    },
  };
  return (
    <Button
      onClick={click}
      variant="outlined"
      sx={buttonStyles}
      startIcon={StartIcon}
    >
      {children}
    </Button>
  );
};
export default StyledButton;
