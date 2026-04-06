export const setTheme = (theme: string) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
};

export const loadTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved);
    return saved;
  }

  // If no saved theme, use system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = prefersDark ? "dark" : "light";
  setTheme(theme);
  return theme;
};
