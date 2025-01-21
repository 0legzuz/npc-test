import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  styled,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useColorMode } from "../../app/providers/ThemeProvider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import logo from "../../shared/assets/logo.svg";

const StyledLogo = styled("img")(({ theme }) => ({
  height: "40px",
  marginRight: theme.spacing(2),
  cursor: "pointer",
}));

const CustomAppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleColorMode, mode } = useColorMode();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ borderRadius: "0" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StyledLogo src={logo} alt="Logo" onClick={handleLogoClick} />
          <Typography variant="h6" component="div">
            БАЗА
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontWeight: location.pathname === "/" ? "bold" : "normal",
              border: location.pathname === "/" ? "1px solid #fff" : "none",
              borderRadius: "10px",
              boxShadow:
                location.pathname === "/"
                  ? "1px 1px 5px rgba(255, 255, 255, 0.3)"
                  : "none",
            }}
          >
            Анализ
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/card-list"
            sx={{
              fontWeight:
                location.pathname === "/card-list" ? "bold" : "normal",
              border:
                location.pathname === "/card-list" ? "1px solid #fff" : "none",
              borderRadius: "10px",
              boxShadow:
                location.pathname === "/card-list"
                  ? "1px 1px 5px rgba(255, 255, 255, 0.3)"
                  : "none",
            }}
          >
            Картотека
          </Button>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
