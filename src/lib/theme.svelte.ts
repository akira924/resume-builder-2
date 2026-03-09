function createThemeState() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let dark = $state(stored ? stored === 'dark' : prefersDark);

  return {
    get dark() {
      return dark;
    },
    toggle() {
      dark = !dark;
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    },
  };
}

export const theme = createThemeState();
