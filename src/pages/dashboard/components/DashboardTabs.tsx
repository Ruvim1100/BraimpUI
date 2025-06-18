import { Box, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EnrolledCourses from "../../../components/EnrolledCourses";

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
    { label: t("recommended"), content: <Box>Очень рекомендую курс по суициду, В конце будет практический экзамен </Box>  },
    { label: t("myLearning"), content: <EnrolledCourses /> },
    { label: t("courseStudio"), content: <Box>Контент для третьего таба</Box> },
  ];

  return (
    <Box sx={{ width: "100%" }}>
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

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
}
