export const ThemeStore = () => {
  return {
    isDarkMode: false,

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  };
};

export type ThemeStoreT = ReturnType<typeof ThemeStore>;
