import { IconButton } from "@mui/material";
import Image from "next/image";
import LightThemeBtn from "../../assets/icon-sun.svg";
import DarkThemeBtn from "../../assets/icon-moon.svg";
const ThemeSwitcher: React.FC<{
  currentTheme: string | null;
  changeTheme: () => void;
}> = ({ currentTheme, changeTheme }) => {
  return (
    <IconButton onClick={changeTheme}>
      {currentTheme === "dark" ? (
        <Image src={LightThemeBtn} alt="light theme" />
      ) : (
        <Image src={DarkThemeBtn} alt="dark theme" />
      )}
    </IconButton>
  );
};
export default ThemeSwitcher;
