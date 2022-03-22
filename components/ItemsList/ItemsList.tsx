import { Box, Typography, Paper } from "@mui/material";
type Props = {};

const ItemsList = (props: Props) => {
  return (
    <Paper
      sx={{
        marginTop: 3,
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box>
          <Typography component="span" color="text.primary" fontWeight={600}>
            Banner Design
          </Typography>
          <Typography
            variant="subtitle2"
            component="span"
            color="text.secondary"
          >
            1 x $156.00
          </Typography>
        </Box>
        <Typography component="span" color="text.primary" fontWeight={600}>
          $156.00
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000",
          padding: 2,
          borderRadius: "10px",
        }}
      >
        Amount Due{" "}
        <Typography color="text.primary" fontWeight={700} fontSize={24}>
          $ 556.00
        </Typography>
      </Box>
    </Paper>
  );
};
export default ItemsList;
