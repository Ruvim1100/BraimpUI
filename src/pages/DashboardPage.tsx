import { Box } from "@mui/material"
import { Typography } from "@mui/material"
import { SignOutButton } from "../components/SignOutButton";
export const DashboardPage = () => (
  <Box>
    <Typography variant="h3" gutterBottom>Welcome to Braimp Dashboard</Typography>
    <Typography>Learn, create and die</Typography>
    <SignOutButton />
  </Box>
);
