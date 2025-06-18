import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png"

const Logo = () => {
  return (
    <Box
      component={RouterLink}
      to="/"
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Box
        component="img"
        src={logo}
        alt="Braimp Logo"
        sx={{ height: "3rem" }}
      />
    </Box>
  );
};

export default Logo;
