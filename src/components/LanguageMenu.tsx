import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
  { code: "ro", label: "Română", flag: "https://flagcdn.com/ro.svg" },
  { code: "ru", label: "Русский", flag: "https://flagcdn.com/ru.svg" },
];

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    console.log('Selected language:', languageCode);
    // Тут ты можешь добавить смену языка через i18n или другую логику
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        size="large"
      >
        <LanguageOutlinedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
                style={{ width: 24, height: 16, objectFit: 'cover' }}
              />
            </ListItemIcon>
            <ListItemText>{lang.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
