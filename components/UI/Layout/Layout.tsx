import {
  PaletteMode,
  createTheme,
  Container,
  ThemeProvider,
  CssBaseline,
  Box,
  useMediaQuery,
} from "@mui/material";
import Header from "../../Header/Header";
import { useState, useEffect, useMemo } from "react";
const Layout: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = useState<string | null>("light");
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
    const storageTheme = localStorage.getItem("theme");
    setThemeMode(storageTheme);
  }, [themeMode]);

  const handleChangeTheme = () => {
    if (themeMode === "light") {
      localStorage.setItem("theme", "dark");
      setThemeMode("dark");
    } else {
      localStorage.setItem("theme", "light");
      setThemeMode("light");
    }
  };
  const getDesignTokens: any = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            // main: "#7C5DFA",
            primary: {
              main: "#373B53",
              light: "white",
            },
            secondary: {
              main: "#7C5DFA",
            },
            background: {
              default: "#F8F8FB",
              header: "#7C5DFA",
            },
            divider: "#7E88C3",
            text: {
              secondary: "#7E88C3",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#373B53",
              light: "#1E2139",
            },
            secondary: {
              main: "#7C5DFA",
            },
            divider: "#7E88C3",
            background: {
              default: "#141625",
            },
          }),
    },
    typography: {
      fontFamily: "Spartan, sans-serif",
    },
  });
  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
  );
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <ThemeProvider theme={theme}>
      <Header themeMode={themeMode} changeTheme={handleChangeTheme} />
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <main style={{ width: matches ? "60%" : "95%" }}>{children}</main>
      </Box>
    </ThemeProvider>
  );
};
export default Layout;
