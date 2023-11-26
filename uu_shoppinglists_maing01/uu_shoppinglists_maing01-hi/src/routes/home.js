//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import ListProvider from "../bricks/shopping-list-list/list-provider.js";
import View from "../bricks/shopping-list-list/view.js";
import CreateView from "../bricks/shopping-list-list/create-view.js";
import NavBar from "../bricks/shopping-list-list/nav-bar.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <ListProvider>
          {/* {({shoppingListList,create,logedUser,switchLogedUser,user, onDeleteList }) => (
            <div>
              <NavBar logedUser={logedUser} switchLogedUser={switchLogedUser} user={user}/>
            <CreateView create={create}
            logedUser={logedUser}
            />
              <View
                shoppingListList={shoppingListList}
                logedUser={logedUser}
                onDeleteList={onDeleteList}
              />
            </div>
          )} //Obsolete*/}

          {({ shoppinglistDataList}) => (
            
            <>
              {shoppinglistDataList.state === "pendingNoData" &&  <Uu5Elements.Pending
      type="circular"
      size="max"
    />}
              {(shoppinglistDataList.state === "pending" || shoppinglistDataList.state.includes("ready")) && (
                
                <div>
                  <CreateView create={shoppinglistDataList.handlerMap.create} />
                  <View
                    shoppingListList={shoppinglistDataList.data}
                  />
                </div>
              )}
               {shoppinglistDataList.state.includes("error") && (
            <Uu5Elements.HighlightedBox colorScheme="negative">
              {shoppinglistDataList.errorData.error.toString()}
            </Uu5Elements.HighlightedBox>
          )}
              
            </>
          )}
        </ListProvider>
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: false });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
