//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import { useAlertBus } from "uu5g05-elements";
import Item from "./item.js";

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

const ItemList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ItemList",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shoppingListItemList: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onResolve: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onDelete: () => {},
    onEdit: () => {},
    onResolve: () => {},
  }, //@@viewOff:defaultProps

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

    function handleDelete(event) {
      const item = event.data;

      try {
        props.onDelete(item);
        addAlert({
          message: `The item ${item.value} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ItemList.logger.error("Error deleting item", error);
        showError(error, "Item delete failed!");
      }
    }

    function handleEdit(event) {
      const item = event.data;

      try {
        props.onEdit(item);
      } catch (error) {
        ItemList.logger.error("Error editing item", error);
        showError(error, "Item edit failed!");
      }
    }

    function handleResolve(event) {
      const item = event.data;

      try {
        props.onResolve(item);
      } catch (error) {
        ItemList.logger.error("Error changing resolved of item", error);
        showError(error, "Item changing resolved failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    function itemList(list) {
      let itemList = list.map((item) => (
        <Item item={item} key={item.id} onDelete={handleDelete} onEdit={handleEdit} onResolve={handleResolve} />
      ));
      return itemList;
    }

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ItemList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
          
          {itemList(props.shoppingListItemList)}
        </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ItemList };
export default ItemList;
//@@viewOff:exports
