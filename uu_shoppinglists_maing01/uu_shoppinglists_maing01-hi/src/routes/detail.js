//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { withRoute } from "uu_plus4u5g02-app";
import RouteBar from "../core/route-bar";
import Uu5Elements from "uu5g05-elements";

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
        <DataProvider>
          {({ dataObject}) => (
                  <>
                  {dataObject.state === "pendingNoData" &&  <Uu5Elements.Pending
          type="circular"
          size="max"
        />}
                  {(dataObject.state === "pending" || dataObject.state.includes("ready")) && (
                   
            <DetailView
              shoppingList={dataObject.data}
              onDelete={dataObject.handlerMap.itemDelete}
              onEdit={dataObject.handlerMap.itemUpdate}
              onResolve={dataObject.handlerMap.itemUpdate}
              onAddItem={dataObject.handlerMap.itemAdd}
              
          onEditTitle={dataObject.handlerMap.update}
          onArchive={dataObject.handlerMap.update}
          onUpdate={dataObject.handlerMap.update}
          leave={dataObject.handlerMap.leave}

            />

            )}
            {dataObject.state.includes("error") && (
         <Uu5Elements.HighlightedBox colorScheme="negative">
           {dataObject.errorData.error.toString()}
         </Uu5Elements.HighlightedBox>
       )}
           
         </>

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
