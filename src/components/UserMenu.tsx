import React, { useMemo, useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
  Box,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { useAuth } from "react-oidc-context";
import SchoolIcon from "@mui/icons-material/School";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";


const UserMenu = () => {
  const { user } = useAuth();

  const {t} = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const { signoutRedirect } = useAuth();

  const fullName = useMemo(() => {
    if (user?.profile?.name) return user.profile.name;
    const given = user?.profile?.given_name || "";
    const family = user?.profile?.surname || "";
    return `${given} ${family}`.trim() || "User";
  }, [user]);

  const avatarLetter = useMemo(
    () => fullName[0]?.toUpperCase() || "U",
    [fullName]
  );

  const menuItems = [
    { icon: <PersonIcon fontSize="small" />, label: "Profile" },
    { icon: <Settings fontSize="small" />, label: "Settings" },
    { icon: <SchoolIcon fontSize="small" />, label: "My Learning" },
    { icon: <EmojiObjectsIcon fontSize="small" />, label: "Course studio" },
  ];

   return (
    <>
      <Tooltip title="Account settings">
        <Box
          onClick={handleOpen}
          sx={{
            display: "flex", alignItems: "center", gap: 1, cursor: "pointer",}}
            m={1}>

          <Avatar sx={{ width: 35, height: 35 }}>{avatarLetter}</Avatar>
        </Box>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          {fullName}
        </MenuItem>

        <Divider />

        {menuItems.map(({ icon, label }) => (
          <MenuItem key={label}>
            <ListItemIcon>{icon}</ListItemIcon>
            {label}
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={() => signoutRedirect()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("signOut")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;