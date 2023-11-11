//@@viewOn:imports
//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState } from "uu5g05";
import { Button, useAlertBus } from "uu5g05-elements";
import CreateForm from "./create-form.js";
import Config from "./config/config.js";
//@@viewOff:imports
//@@viewOff:imports

//@@viewOn:constants
const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",}
//@@viewOff:constants

//@@viewOn:css
const Css = {
 
  button: () => Config.Css.css({ display: "block", margin: "0px auto" }),
};
//@@viewOff:css

//@@viewOn:helpers
function CreateButton(props) {
  return (
    <Button {...props} colorScheme="primary" significance="highlighted" className={Css.button()}>
      {props.children}
    </Button>
  );
}
//@@viewOff:helpers

const CreateView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    
    onCreate: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [mode, setMode] = useState(Mode.BUTTON);
    const { addAlert } = useAlertBus();

    async function handleSubmit(event) {
      let shoppingList;

      try {
        shoppingList = await props.create(event.data.value);
      } catch (error) {
        CreateView.logger.error("Error while creating shoppinglist", error);
        addAlert({
          header: "Shopping List creation failed!",
          message: error.message,
          priority: "error",
        });
        return;
      }

      addAlert({
        message: `The list ${shoppingList.name} has been created`,
        priority: "success",
        durationMs: 2000,
      });

      setMode(Mode.BUTTON);

    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    let content;

    switch (mode) {
      case Mode.BUTTON:
        content = <CreateButton onClick={() => setMode(Mode.FORM)}>New list</CreateButton>;
        break;
      default:
        content = (
          <CreateForm onSubmit={handleSubmit} onCancel={() => setMode(Mode.BUTTON)} />
        );
        break;
    }

    return <div {...attrs}>{content}</div>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateView };
export default CreateView;
//@@viewOff:exports
