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
          )} */}

          {({ shoppinglistDataList, logedUser, switchLogedUser, user }) => (
            
            <>
              {shoppinglistDataList.state === "pendingNoData" && <Uu5Elements.Skeleton width="100%" height="200px" />}
              {(shoppinglistDataList.state === "pending" || shoppinglistDataList.state.includes("ready")) && (
                
                <div>
                  <NavBar logedUser={logedUser} switchLogedUser={switchLogedUser} user={user} />
                  <CreateView create={shoppinglistDataList.handlerMap.create} logedUser={logedUser} />
                  <View
                    shoppingListList={shoppinglistDataList.data}
                    logedUser={logedUser}
                  />
                </div>
              )}
               {shoppinglistDataList.state.includes("error") && (
            <Uu5Elements.HighlightedBox colorScheme="negative">
              {shoppinglistDataList.errorData.toString()}
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
