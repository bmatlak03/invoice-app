import { Box, Divider, useTheme } from "@mui/material";
import Logo from "../UI/Logo/Logo";
import Account from "../Account/Account";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
const Header: React.FC<{
  themeMode: string | null;
  changeTheme: () => void;
}> = ({ themeMode, changeTheme }) => {
  const theme = useTheme();
  return (
    <header>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "60px",
          paddingRight: 4,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Logo />
        <Box sx={{ display: "flex" }}>
          <ThemeSwitcher currentTheme={themeMode} changeTheme={changeTheme} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginRight: 2, marginLeft: 2 }}
          />
          <Account />
        </Box>
      </Box>
    </header>
  );
};
export default Header;
