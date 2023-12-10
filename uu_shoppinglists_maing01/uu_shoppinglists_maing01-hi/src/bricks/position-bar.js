//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute,useAppBackground } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";

import { useUserContext } from "./users/user-context.js";
import { useThemeContext } from "../core/theme-provider/theme-context.js";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
const DarkModeToggle = createVisualComponent({
  uu5Tag: "Uu5Demo.DarkModeToggle",

  render(props) {
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark";

    return (
      <Uu5Elements.Toggle
        value={!darkMode}
        onChange={() => setBackground({
          backgroundColor: darkMode ? null : Uu5Elements.UuGds.ColorPalette.getValue(["building", "dark", "main"])
        })}
        iconOff="uugdsstencil-weather-moon"
        iconOn="uugdsstencil-weather-sun"
      />
    )
  }
});
//@@viewOff:helpers

const PositionBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PositionBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { userList, loggedUser, setLoggedUser } = useUserContext();
    const { isDarkMode, switchTheme } = useThemeContext();

    const [, setRoute] = useRoute();

    const actionList = [
      // {
      //   children: (
      //     <Lsi import={importLsi} path={isDarkMode ? ["Menu", "isDarkTheme"]:["Menu", "isLightTheme"]} />
      //   ),
      //   onClick: () => switchTheme(),
      // },//TODO: Pro konzultaci poznamek k FE odkomentovat
      // // homework routes
      {
        children: <Lsi import={importLsi} path={["Menu", "home"]} />,
        onClick: () => setRoute("home"),
        collapsed: false,
      },
      {
        children: <DarkModeToggle/>,
        
        collapsed: false,
      },
      {
        children: loggedUser.name,
        colorScheme: "primary",
        significance: "highlighted",
        itemList: getUserItemList({ userList, setLoggedUser }),
        collapsed: false,
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5App.PositionBar view={"short"} actionList={actionList} >
      
      
      </Plus4U5App.PositionBar>
    );
    //@@viewOff:render
  },
});

function getUserItemList({ userList, setLoggedUser }) {
  const userItemList = [];
  userList.forEach((user) => {
    userItemList.push({
      children: user.name,
      onClick: () => setLoggedUser(user),
    });
  });
  return userItemList;
}

//@@viewOn:exports
export { PositionBar };
export default PositionBar;
//@@viewOff:exports
