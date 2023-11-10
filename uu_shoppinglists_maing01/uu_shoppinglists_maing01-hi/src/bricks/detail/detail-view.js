//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import ItemCreate from "./item-create.js";
import ShoppingListHeader from "./shopping-list-header.js";

import ItemList from "./item-list.js";
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

const DetailView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailView",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DetailView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
          <ShoppingListHeader title={props.shoppingList.name}
          onEditTitle={props.onEditTitle}
          onArchive={props.onArchive}
          />
        <ItemCreate onAddItem={props.onAddItem}/>
        <ItemList 
        shoppingListItemList ={props.shoppingList.itemList} 
        onDelete={props.onDelete}
        onEdit={props.onEdit}
        onResolve={props.onResolve}
        />
        </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailView };
export default DetailView;
//@@viewOff:exports
