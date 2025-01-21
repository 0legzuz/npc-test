import React from "react";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3, maxWidth: "1440px" }}>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать
      </Typography>
      <Typography variant="body1" gutterBottom>
        Это стартовая страница
      </Typography>
    </Box>
  );
};

export default Dashboard;
