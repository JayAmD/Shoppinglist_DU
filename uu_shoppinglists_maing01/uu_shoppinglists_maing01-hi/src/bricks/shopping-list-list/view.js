//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRoute,Lsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Tiles from "uu5tilesg02";
import { useAlertBus } from "uu5g05-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";
import importLsi from "../../lsi/import-lsi.js";


import Tile from "./tile.js";

//@@viewOff:imports

//@@viewOn:constants
const FILTER_LIST = [
  {
    key: "Archived",
    label: <Lsi import={importLsi} path={["ListView", "archived"]} />,
    filter: (item, value) => {
      if (!value) {
        return !item.data.isArchived
      }
      return true;
    },
    inputType: "bool",
  },
]

const SORTER_LIST = [
  {
    key: "name",
    label: <Lsi import={importLsi} path={["ListView", "nameSort"]} />,
    sort: (a, b) => a.data.name.localeCompare(b.name),
  },

];
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
    const [sorterList, setSorterList] = useState([]);
    const [, setRoute] = useRoute();

    
    function onFilterChange(e) {
      setFilterList(e.data.filterList);
    }
    function onSorterChange(e) {
      setSorterList(e.data.sorterList);
    }


    const { addAlert } = useAlertBus();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    async function handleDeleteList(event) {
      
      const list = event.data;

      try {
        await list.handlerMap.delete()
        addAlert({
          message: `The list ${list.data.name} has been deleted.`,
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
            data={props.shoppingListList|| []}
             filterDefinitionList={FILTER_LIST}
            filterList={filterList}
            onFilterChange={onFilterChange}
            sorterDefinitionList={SORTER_LIST}
            sorterList={sorterList}
            onSorterChange={onSorterChange}
          >
            <Uu5TilesControls.SearchButton />
            <Uu5TilesControls.FilterButton />
            <Uu5TilesControls.SorterButton />

            <Uu5TilesControls.FilterBar initialExpanded displayClearButton={false} displayManagerButton={false} displayCloseButton={false}
 />
            <Uu5TilesControls.SorterBar displayClearButton={false} displayManagerButton={false} displayCloseButton={false} />
            <Uu5TilesElements.Grid tileMinWidth={150} tileMaxWidth={250}  >
              {<Tile  onDeleteList={handleDeleteList} />}
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
