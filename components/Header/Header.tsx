import { Box, Divider, useTheme } from "@mui/material";
import AvatarImg from "../Avatar/Avatar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Logo from "../UI/Logo/Logo";
const Header: React.FC<{
  themeMode: string | null;
  changeTheme: () => void;
}> = ({ themeMode, changeTheme }) => {
  const theme = useTheme();
  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "60px",
    paddingRight: 4,
    backgroundColor: theme.palette.primary.main,
  };
  return (
    <header>
      <Box sx={headerStyles}>
        <Logo />
        <Box sx={{ display: "flex" }}>
          <ThemeSwitcher currentTheme={themeMode} changeTheme={changeTheme} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginRight: 2, marginLeft: 2 }}
          />
          <AvatarImg />
        </Box>
      </Box>
    </header>
  );
};
export default Header;
