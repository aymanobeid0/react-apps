import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isFakeDark, setIsFakeDark] = useState(false);
  const toggleDarkMode = () => setIsFakeDark((prevMode) => !prevMode);

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );
  return (
    <ThemeContext.Provider value={{ isFakeDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
function useTheme() {
  const context = useContext(ThemeContext);
  //   if (context === undefined)
  //     throw new Error("ThemeContext was used outside of the ThemeProvider");
  return context;
}

export { ThemeProvider, useTheme };
