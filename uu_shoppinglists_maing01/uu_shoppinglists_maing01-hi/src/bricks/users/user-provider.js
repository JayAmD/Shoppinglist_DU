//@@viewOn:imports
import { createComponent, useState } from "uu5g05";
import UserContext from "./user-context";
import Config from "./config/config";

//@@viewOff:imports
const userList = [
  {
    id: "11", //generated unique code
   name: "Petr Novák",
  },
  {
    id: "22", //generated unique code
   name: "Jan Zima",
  },
  {
    id: "33", //generated unique code
    name: "Vojtech Palacinka",
  },
];


export const UserProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [loggedUser, setLoggedUser] = useState(userList[0]);

    const value = {
      loggedUser,
      userList,
      setLoggedUser,
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <UserContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </UserContext.Provider>
    );
    //@@viewOff:render
  },
});

export default UserProvider;
