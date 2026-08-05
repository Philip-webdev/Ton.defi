import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeColors {
  bg: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  success: string;
  warning: string;
  error: string;
  border: string;
  inputBg: string;
  navBg: string;
  isDark: boolean;
}

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
  isDark: boolean;
  colors: ThemeColors;
}

const darkColors: ThemeColors = {
  bg: "#0A0A0A",
  surface: "#141414",
  surfaceElevated: "#1C1C1C",
  text: "#F0EDE8",
  textSecondary: "#9A9A9A",
  textMuted: "#555555",
  accent: "#24ACF2",
  accentSoft: "rgba(36,172,242,0.12)",
  success: "#00E676",
  warning: "#FF9100",
  error: "#FF5252",
  border: "rgba(255,255,255,0.06)",
  inputBg: "rgba(255,255,255,0.05)",
  navBg: "rgba(10,10,10,0.85)",
  isDark: true,
};

const lightColors: ThemeColors = {
  bg: "#F5F3EF",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#6B6B6B",
  textMuted: "#AAAAAA",
  accent: "#0083D0",
  accentSoft: "rgba(0,131,208,0.08)",
  success: "#2E7D32",
  warning: "#E65100",
  error: "#C62828",
  border: "rgba(0,0,0,0.06)",
  inputBg: "rgba(0,0,0,0.04)",
  navBg: "rgba(245,243,239,0.9)",
  isDark: false,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggle: () => {},
  isDark: true,
  colors: darkColors,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));
  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === "dark", colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
