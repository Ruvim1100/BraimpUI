import React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CampaignIcon from "@mui/icons-material/Campaign";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../routes/paths";
import { useTranslation } from "react-i18next";

const drawerWidth = 220;

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const { courseId} = useParams();

  const groupedItems = [
    [
      {
        label: t("course.dashboard"),
        icon: <DashboardOutlinedIcon />,
        path: courseId ? paths.course.base.replace(":courseId", courseId) : "#",
      },
      {
        label: t("course.news"),
        icon: <CampaignIcon />,
        path: courseId ? paths.course.news.replace(":courseId", courseId) : "#",
      },
      {
        label: t("course.content"),
        icon: <MenuBookIcon />,
        path: courseId ? paths.course.content.replace(":courseId", courseId) : "#",
      },
    ],
    [
      {
        label: t("course.grades"),
        icon: <SchoolIcon />,
        path: courseId ? paths.course.grades.replace(":courseId", courseId) : "#",
      },
      {
        label: t("course.participants"),
        icon: <GroupsIcon />,
        path: courseId ? paths.course.participants.replace(":courseId", courseId) : "#",
      },
      { label: t("course.schedule"), icon: <CalendarMonthIcon />, path: "#" },
    ],
    [
      {
        label: t("course.backToCourses"),
        icon: <LogoutIcon />,
        path: paths.learning.base,
      },
    ],
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRadius: 0,
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {groupedItems.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map(({ label, icon, path }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton onClick={() => navigate(path)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
            {groupIndex < groupedItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};
