import { Container } from "@mui/material";
import DashboardTabs from "./components/DashboardTabs"
import CreateCourseFormDialog from "../../../components/CreateCourseFormDialog";

const DashboardPage = () => (
  <Container maxWidth="xl">
    <DashboardTabs/>
    <CreateCourseFormDialog/>
  </Container>
);

export default DashboardPage;
