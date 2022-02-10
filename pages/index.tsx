import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import Layout from "../components/UI/Layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Box>
        <Typography color="primary">Main content...</Typography>
      </Box>
    </Layout>
  );
};

export default Home;
