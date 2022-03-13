import { Button, Box, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
type Props = {
  type: string;
  onClick?: any;
  customStyles?: object;
  role?: any;
};

const StyledButton: React.FC<Props> = (props) => {
  const { children, type, onClick, customStyles, role } = props;
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

  const modifiedBackgroundColor =
    type === "add"
      ? theme.palette.secondary.main
      : type === "discard"
      ? "#252945"
      : type === "draft"
      ? theme.palette.primary.dark
      : theme.palette.secondary.main;
  let buttonStyles: {} = {
    minWidth: "100px",
    padding: 1,
    backgroundColor: modifiedBackgroundColor,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "white",
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
      type={role ? role : "button"}
    >
      {children}
    </Button>
  );
};
export default StyledButton;
