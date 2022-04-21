import { Button, Box, useTheme, AlertColor } from "@mui/material";
import { Add } from "@mui/icons-material";
type Props = {
  type?: string | AlertColor;
  onClick?: () => void;
  customStyles?: object;
  role?: "submit" | "button";
  disabled?: boolean;
};

const StyledButton: React.FC<Props> = (props) => {
  const {
    children,
    type,
    onClick,
    customStyles,
    role = "button",
    disabled,
  } = props;
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
        <Add color="secondary" />
      </Box>
    ) : null;

  const checkBackgroundColor = () => {
    if (type === "add") {
      return theme.palette.secondary.main;
    } else if (type === "light") {
      return "#F9FAFE";
    } else if (type === "grey") {
      return "#373B53";
    } else if (type === "red") {
      return "#EC5757";
    } else {
      return theme.palette.secondary.main;
    }
  };

  const buttonStyles: {} = {
    minWidth: "100px",
    padding: 1,
    backgroundColor: checkBackgroundColor(),
    textTransform: "capitalize",
    fontWeight: "bold",
    color: type === "light" ? "#7E88C3" : "white",
    border: "none",
    borderRadius: "50px",
    "&:hover": {
      border: "none",
      backgroundColor: type === "add" && "#9277FF",
    },
    ...customStyles,
  };

  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={buttonStyles}
      startIcon={StartIcon}
      type={role}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
export default StyledButton;
