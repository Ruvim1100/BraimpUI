import { Box } from "@mui/material";
import Header from "../../../assets/Head.png";

const DashboardPage = () => {

  return (
    <Box>
      <Box
        component="img"
        src={Header}
        sx={{
          width: "100%",
          maxHeight: 180,
          borderRadius: 2,
          objectFit: "cover",
        }}
      ></Box>

    </Box>
  );
};

export default DashboardPage;
