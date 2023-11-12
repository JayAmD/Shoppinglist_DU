//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5Tiles from "uu5tilesg02";
import { useAlertBus } from "uu5g05-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";

import Tile from "./tile.js";

//@@viewOff:imports

//@@viewOn:constants
const FILTER_LIST = [
  {
    key: "Archived",
    label: "Archived",
    filter: (item, value) => {
      if (!value) {
        return !item.isArchived
      }
      return true;
    },
    inputType: "bool",
  },
]
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
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
    const [filterList, setFilterList] = useState([]);
    
    // const data = {}
    // data.lists=props.shoppingListList
    // data.logedUser=props.logedUser //prop pro Uu5Tiles.ControllerProvider musi byt Array, ne array v objecku

    function onFilterChange(e) {
      setFilterList(e.data.filterList);
    }

    const { addAlert } = useAlertBus();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleDeleteList(event) {
      const list = event.data;

      try {
        props.onDeleteList(list);
        addAlert({
          message: `The list ${list.name} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        View.logger.error("Error deleting list", error);
        showError(error, "List delete failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, View);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
        <div className={Config.Css.css({ padding: "16px 32px" })}>
          <Uu5Tiles.ControllerProvider
            data={props.shoppingListList}
             filterDefinitionList={FILTER_LIST}
            filterList={filterList}
            onFilterChange={onFilterChange}
            // sorterDefinitionList={SORTER_LIST}
            // sorterList={sorterList}
            // onSorterChange={onSorterChange}
          >
            <Uu5TilesControls.FilterButton />
            {/* <Uu5TilesControls.SorterButton /> */}
            <Uu5TilesControls.SearchButton />
            <Uu5TilesControls.FilterBar initialExpanded />
            {/* <Uu5TilesControls.SorterBar initialExpanded /> */}
            <Uu5TilesControls.Counter />
            <Uu5TilesElements.Grid tileMinWidth={100} tileMaxWidth={200}>
              {<Tile logedUser={props.logedUser} onDeleteList={handleDeleteList} />}
            </Uu5TilesElements.Grid>
          </Uu5Tiles.ControllerProvider>
        </div>
          </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
