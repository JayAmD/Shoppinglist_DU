//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
let shoppinglistList = [
  {
    
  }
]
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const DataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DataProvider };
export default DataProvider;
//@@viewOff:exports
