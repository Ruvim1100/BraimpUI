import { Box, Divider, Typography } from "@mui/material";

export const BuilderEmpty = () => {
  return (
    <Box display={"flex"} flexDirection="column" alignItems="center" justifyContent={"center"}>
      <Typography variant="h5">Выберите урок</Typography>
      <Divider sx={{ width: "90%", mt: 2}}  />
    </Box>
  );
};
