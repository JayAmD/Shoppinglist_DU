//@@viewOn:imports
import { createComponent, useState } from "uu5g05";
import ThemeContext from "./theme-context";
import Config from "./config/config";

//@@viewOff:imports
// const themeList = [
//   "#FFFFFF"	, "#000000"
// ];


export const ThemeProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ThemeProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isDarkMode, setIsDarkMode] = useState(false);

    function switchTheme() {
      setIsDarkMode(current=> !current)
    }
    const value = {
      isDarkMode,
      switchTheme,
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ThemeContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </ThemeContext.Provider>
    );
    //@@viewOff:render
  },
});

export default ThemeProvider;
