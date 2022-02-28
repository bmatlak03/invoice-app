import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
type Props = {
  status: string;
};

const InvoiceStatus = ({ status }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  let bgColor;
  let fontColor;
  if (status === "paid") {
    bgColor = "rgba(51, 214, 159, 0.1)";
    fontColor = "rgb(51, 214, 159)";
  } else if (status === "pending") {
    bgColor = "rgba(255, 143, 0, 0.1)";
    fontColor = "rgb(255, 143, 0)";
  } else {
    bgColor = "rgba(223, 227, 250, 0.1)";
    fontColor = "rgb(179, 183, 201)";
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: !matches ? "40%" : "20%",
        minHeight: "50px",
        borderRadius: "5px",
        backgroundColor: bgColor,
      }}
    >
      <Box
        sx={{
          width: "10px",
          height: "10px",
          borderRadius: "50px",
          backgroundColor: fontColor,
          marginRight: 1,
        }}
      />
      <Typography sx={{ color: fontColor, textTransform: "capitalize" }}>
        {status}
      </Typography>
    </Box>
  );
};
export default InvoiceStatus;
