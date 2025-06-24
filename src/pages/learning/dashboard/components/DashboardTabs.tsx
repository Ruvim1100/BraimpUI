import { Box, Tabs, Tab, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EnrolledCourses from "./EnrolledCourses";
import CourseList from "./CourseList";

function TabPanel({
  children,
  value,
  index,
}: {
  children?: React.ReactNode;
  value: number;
  index: number;
}) {
  return value === index ? <Box>{children}</Box> : null;
}

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();

  const tabs = [
    { label: t("learning.recommended"), content: <CourseList /> },
    { label: t("learning.myLearning"), content: <EnrolledCourses /> },
    { label: t("learning.completedCourses"), content: <Box>Контент для третьего таба</Box> },
    { label: t("learning.educationLeaders"), content: <Box>Контент для Четвёртого таба</Box> },
  ];

  return (
    <Box sx={{ width: "100%"}}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        aria-label="dashboard tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Divider/>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
}
