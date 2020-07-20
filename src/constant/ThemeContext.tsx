import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { setDark } from "../actions";
import { lightTheme, darkTheme } from "./Theme";

const ThemeContext = React.createContext({
  isDark: true,
  toggle: () => {},
});

interface IThemeContextProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const ThemeProvider: React.FC<IThemeContextProps> = ({
  isDark,
  setIsDark,
  children,
}) => {
  // paints the app before it renders elements
  useLayoutEffect(() => {
    const applyTheme = (theme: Array<string>) => {
      const root = document.getElementsByTagName("html")[0];
      root.style.cssText = theme.join(";");
    };

    const themeToApply = isDark ? darkTheme : lightTheme;
    setIsDark(isDark);
    applyTheme(themeToApply);
    // if state changes, repaints the app
  }, [isDark, setIsDark]);

  const toggle = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
interface IState {
  isDark: boolean;
}
const mapStateToProps = (state: IState) => ({ isDark: state.isDark });

const mapDispatchToProps = (dispatch: any) => ({
  setIsDark: (isDark: boolean) => dispatch(setDark({ isDark })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);

export { ThemeContext };
