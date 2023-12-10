//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, Lsi, useScreenSize } from "uu5g05";
import Config from "./config/config.js";
import ItemCreate from "./item-create.js";
import ShoppingListHeader from "./shopping-list-header.js";
import Uu5Elements from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js";

import ItemList from "./item-list.js";
import UsersDrawer from "./users-drawer.js";
import { useThemeContext } from "../../core/theme-provider/theme-context.js";

//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {};
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
    const { isDarkMode } = useThemeContext();
    const [menuOpen, setMenuOpen] = useState(false);

    

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DetailView);

    return currentNestingLevel ? (
      <div
        className={Config.Css.css({
          height: "100%",
          display: "flex",
          flexFlow: "column",
          backgroundColor: isDarkMode && "#121212",
        })}
      >
        <Uu5Elements.Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          content={
            <>
              <Uu5Elements.Button
                icon={!menuOpen ? "uugds-menu" : "uugds-close"}
                children={
                  menuOpen ? (
                    <Lsi import={importLsi} path={["Members", "close"]} />
                  ) : (
                    <Lsi import={importLsi} path={["Members", "open"]} />
                  )
                }
                significance="highlighted"
                onClick={() => setMenuOpen((prev) => !prev)}
                className={Config.Css.css({ marginBottom: 24 })}
              />
              <UsersDrawer shoppingList={props.shoppingList} handleUpdate={props.onUpdate} leave={props.leave} />
            </>
          }
        >
          <div className={Config.Css.css({ padding: 24 })}>
            {!menuOpen && (
              <Uu5Elements.Button
                icon={menuOpen ? "uugds-close" : "uugds-menu"}
                children={
                  menuOpen ? (
                    <Lsi import={importLsi} path={["Members", "close"]} />
                  ) : (
                    <Lsi import={importLsi} path={["Members", "open"]} />
                  )
                }
                significance="highlighted"
                onClick={() => setMenuOpen((prev) => !prev)}
                className={Config.Css.css({ marginBottom: 24 })}
              />
            )}

            <div>
              <ShoppingListHeader
                title={props.shoppingList.name}
                ownerId={props.shoppingList.ownerId}
                onEditTitle={props.onEditTitle}
                onArchive={props.onArchive}
              />
              <ItemCreate onAddItem={props.onAddItem} />
              <ItemList
                shoppingListItemList={props.shoppingList.itemList}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
                onResolve={props.onResolve}
              />
            </div>
          </div>
        </Uu5Elements.Drawer>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
        <div
          className={Config.Css.css({
            flexGrow: 1,
          })}
        ></div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailView };
export default DetailView;
//@@viewOff:exports
