import { IconButton, Tooltip } from "@mui/material";
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useThemeContext } from "../theme/ThemeContext";

const SwitchThemeToggle = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "dark" ? <LightModeOutlinedIcon /> : <NightlightOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default SwitchThemeToggle;
