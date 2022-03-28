import { Box, CircularProgress } from "@mui/material";

const Spinner = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      textAlign: "center",
    }}
  >
    <CircularProgress color="secondary" />
  </Box>
);

export default Spinner;
