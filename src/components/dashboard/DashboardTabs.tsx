import * as React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import CategoriesList from '../categories/CategoriesList';
import EnrolledCourses from '../courses/EnrolledCourses';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DashboardTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
    const { t } = useTranslation();
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label={t("recommended")} {...a11yProps(0)} />
        <Tab label={t("myLearning")} {...a11yProps(1)} />
        <Tab label={t("courseStudio")} {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <CategoriesList/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EnrolledCourses/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Контент для третьего таба</Typography>
      </TabPanel>
    </Box>
  );
}
