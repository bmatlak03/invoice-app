import { IconButton, PaletteMode } from "@mui/material";
import Image from "next/image";
import LightThemeBtn from "../../assets/icon-sun.svg";
import DarkThemeBtn from "../../assets/icon-moon.svg";
const ThemeSwitcher: React.FC<{
  currentTheme: PaletteMode;
  changeTheme: () => void;
}> = ({ currentTheme, changeTheme }) => {
  const themeIcon =
    currentTheme === "dark" ? (
      <Image src={LightThemeBtn} alt="light theme" />
    ) : (
      <Image src={DarkThemeBtn} alt="dark theme" />
    );
  return <IconButton onClick={changeTheme}>{themeIcon}</IconButton>;
};
export default ThemeSwitcher;
