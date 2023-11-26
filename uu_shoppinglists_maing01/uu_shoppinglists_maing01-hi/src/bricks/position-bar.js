//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";

import { useUserContext } from "./users/user-context.js";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
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
   
    const [, setRoute] = useRoute();

    const actionList = [
      // { children: <Lsi import={importLsi} path={["Menu", "home"]} />, onClick: () => setRoute("home") },
      // // homework routes
       {
        children: "Seznam nákupních seznamů",
        onClick: () => setRoute("home"),
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
      <Plus4U5App.PositionBar view={"short"} actionList={actionList} {...props}>
        
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
