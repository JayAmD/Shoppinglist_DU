//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      padding: 4,
    }),

  checkbox: () =>
    Config.Css.css({
      width: 30,
      float: "left",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

function withControlledInput(Input) {
  return (props) => {
    const { value: propsValue, onChange } = props;

    const [value, setValue] = useState(propsValue);

    return (
      <div>
        <Input
          {...props}
          value={value}
          onChange={(e) => {
            typeof onChange === "function" && onChange(e);
            setValue(e.data.value);
          }}
        />
      </div>
    );
  };
}

const Checkbox = withControlledInput(Uu5Forms.Checkbox);
const Text = withControlledInput(Uu5Forms.Text);

const Item = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Item",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isResolved: PropTypes.bool,
    }).isRequired,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;

    function handleDelete(event) {
      props.onDelete(new Utils.Event(props.item, event));
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Item);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
          <Checkbox
            className={Css.checkbox()}
            onChange={(e) => {
              //TODO chnge isResolved function passed from DataProvider
            }}
          />

          <Text iconRight="uugds-delete" onIconRightClick={handleDelete} />
        </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Item };
export default Item;
//@@viewOff:exports
