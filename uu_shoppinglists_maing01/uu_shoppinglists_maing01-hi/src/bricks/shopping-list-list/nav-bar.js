//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { Dropdown, useAlertBus, Text, Link } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const NavBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "NavBar",
  nestingLevel: ["areaCollection", "area"],
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
    const { addAlert } = useAlertBus();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    let itemList = [];

    props.user.map((element) => {
      let result = {
        children: element.firstname + " " + element.surname + " id:" + element.id,
        onClick: () => handleChangeUser(element.id),
      };
      itemList.push(result);
    });

    function handleChangeUser(user) {
      try {
        props.switchLogedUser(user);
        addAlert({
          message: `The user has been switched.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        NavBar.logger.error("Error switching the user", error);
        showError(error, "Error switching the user!");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, NavBar);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
          <Text
            className={Config.Css.css({ float: "left", margin: "10px" })}
            category="story"
            segment="heading"
            type="h2"
          >
            <Link onClick={() => setRoute("home")}>Home</Link>
          </Text>
          <Dropdown
            className={Config.Css.css({ float: "right", margin: "10px" })}
            label={props.logedUser.firstname + " " + props.logedUser.surname + " id:" + props.logedUser.id}
            itemList={itemList}
          />
        </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
        <div className={Config.Css.css({ clear: "both" })}></div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { NavBar };
export default NavBar;
//@@viewOff:exports
