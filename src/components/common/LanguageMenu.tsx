import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import i18n from "i18next";
import { Button } from "@mui/material";

const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
  { code: "ro", label: "Română", flag: "https://flagcdn.com/ro.svg" },
  { code: "ru", label: "Русский", flag: "https://flagcdn.com/ru.svg" },
];

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
        startIcon={<LanguageOutlinedIcon />}
        sx={{
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        {currentLanguage.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <ListItemIcon>
              <img
                src={lang.flag}
                alt={lang.label}
                style={{ width: 24, height: 16, objectFit: "cover" }}
              />
            </ListItemIcon>
            <ListItemText>{lang.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
