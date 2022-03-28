import { Button, useTheme } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";

type Props = {
  click: () => void;
};

const GoBackBtn = ({ click }: Props) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        textTransform: "capitalize",
        color: theme.palette.mode === "dark" ? "white" : "black",
        fontSize: "1rem",
      }}
      onClick={click}
      startIcon={
        <KeyboardArrowDownIcon
          color="secondary"
          sx={{
            transform: "rotate(90deg)",
          }}
        />
      }
    >
      Go back
    </Button>
  );
};
export default GoBackBtn;
