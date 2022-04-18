import { Box, Divider, PaletteMode, useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AvatarImg from "../Avatar/Avatar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Logo from "../UI/Logo/Logo";
type Props = {
  themeMode: PaletteMode;
  changeTheme: () => void;
};
const Header = ({ themeMode, changeTheme }: Props) => {
  const theme = useTheme();
  const { status } = useSession();
  const router = useRouter();
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
          {status === "authenticated" && (
            <>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginRight: 2, marginLeft: 2 }}
              />
              <AvatarImg click={() => router.push("/profile")} size="small" />
            </>
          )}
        </Box>
      </Box>
    </header>
  );
};
export default Header;
