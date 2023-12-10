//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, PropTypes, useLsi, Lsi,useEffect, useScreenSize } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements,{ Button, useAlertBus } from "uu5g05-elements";
import { Form, FormText } from "uu5g05-forms";

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

  button: () =>
    Config.Css.css({
      float: "left",
    }), //TODO: EDIT CSS TO ADD BUTTON
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ItemCreate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ItemCreate",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onAddItem: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const { addAlert } = useAlertBus();

    const [input, setInput] = useState(""); //TODO: FormText nema value property, nejde prepsat. Zeptat se na to.

    const [screenSize] = useScreenSize();

    const [isMobile, setIsMobile] = useState();
    useEffect(() => {
      setIsMobile(() => {
        if (["xs"].includes(screenSize)) return true;
        else return false;
      });
    }, [screenSize]);

    const placeholderAdd = useLsi({ cs: "Nová položka", en: "New item" });

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleAddItem(event) {
      let newEvent = new Utils.Event(event.data.value, event); //TODO: Opet jako u componenty Item, si nejsem jist jak Utils.Event funguje
      const item = newEvent.data;

      try {
        props.onAddItem(item);
        addAlert({
          message: `The item ${item.value} has been added.`,
          priority: "success",
          durationMs: 2000,
        });
        setInput("");
      } catch (error) {
        ItemCreate.logger.error("Error adding the item", error);
        showError(error, "Item addition failed!");
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ItemCreate);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
          <Form onSubmit={handleAddItem}>
            <Button
              name="button"
              className={Css.button()}
              type="submit"
              onClick={() => {}}
              colorScheme="positive"
              //significance="highlighted"
            >
              <Uu5Elements.Icon icon="uugds-plus-circle"/>
              {isMobile?"":
              <Lsi
                lsi={{
                  cs: "Přidat",
                  en: "Add",
                }}
              />}
            </Button>
            <FormText value={input} name="value" colorScheme="positive" placeholder={placeholderAdd} />
          </Form>
        </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ItemCreate };
export default ItemCreate;
//@@viewOff:exports
