//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { withRoute } from "uu_plus4u5g02-app";
import RouteBar from "../core/route-bar";
import DataProvider from "../bricks/detail/data-provider.js";
import DetailView from "../bricks/detail/detail-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css

//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <DataProvider>
          {({ shoppingList, remove, editItem, resolve, addItem , deleteList,editTitle,archive}) => (
            <DetailView
              shoppingList={shoppingList}
              onDelete={remove}
              onEdit={editItem}
              onResolve={resolve}
              onAddItem={addItem}
              onDeleteList={deleteList}
          onEditTitle={editTitle}
          onArchive={archive}
            />
          )}
        </DataProvider>
      </>
    );
    //@@viewOff:render
  },
});

Detail = withRoute(Detail, { authenticated: false });

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
