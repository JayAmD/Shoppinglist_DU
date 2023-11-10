//@@viewOn:imports
import { createComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";

//@@viewOff:imports

//@@viewOn:constants
let initialShoppingListList = [
  {
    id: "61e1556d17f0e248baf15f4b", //generated unique code
    awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
    sys: {
      cts: "2022-01-14 10:50:21.637Z", //create timestamp
      mts: "2022-01-14 10:50:42.542Z", //modification timestamp
      rev: 0, //revision number
    },
    name: "Groceries", // shoppinglist name - mandatory; length is limited to 1-255 characters
    isArchived: false,
    ownerId: "543ebf71c50ed33d7c03dda9", //id of the owner
    memberIdList: ["61e1554617f0e248baf15f42"], // array of member ids
    itemList: [
      {
        id: "61e1554617f0e248baf15f42", //generated unique code
        value: "potatos", // item value; length is limited to 1-255 characters
        isResolved: false,
      },
      {
        id: "91e1554617f0e248baf15f42", //generated unique code
        value: "carrot", // item value; length is limited to 1-255 characters
        isResolved: true,
      },
      {
        id: "64e1554617f0e248baf15f42", //generated unique code
        value: "salt", // item value; length is limited to 1-255 characters
        isResolved: false,
      },
    ],
  },
  {
    id: "67e1556d17f0e248baf15f4b", //generated unique code
    awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
    sys: {
      cts: "2022-01-14 10:50:21.637Z", //create timestamp
      mts: "2022-01-14 10:50:42.542Z", //modification timestamp
      rev: 0, //revision number
    },
    name: "Cars", // shoppinglist name - mandatory; length is limited to 1-255 characters
    isArchived: false,
    ownerId: "593ebf71c50ed33d7c03dda9", //id of the owner
    memberIdList: ["61e1554617f0e248baf15f42"], // array of member ids
    itemList: [
      {
        id: "61e8554617f0e248baf15f42", //generated unique code
        value: "Ferarry", // item value; length is limited to 1-255 characters
        isResolved: false,
      },
    ],
  },
];
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const DataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [shoppingList, setShoppingList] = useState(initialShoppingListList[0]);

    function remove(itemDelete) {
      setShoppingList((prevShoppingList) => {
        let filteredItemList = prevShoppingList.itemList.filter((item) => item.id !== itemDelete.id);
        let filteredShoppingList = { ...prevShoppingList, itemList: filteredItemList };

        return filteredShoppingList;
      });
    }

    function editItem(item) {
      setShoppingList((prevShoppingList) => {
        let editedIndex = prevShoppingList.itemList.findIndex((currentItem) => currentItem.id === item.id);
        let result = { ...prevShoppingList };
        result.itemList[editedIndex].value = item.value;
        return result;
      });
    }

    function resolve(item) {
      setShoppingList((prevShoppingList) => {
        let editedIndex = prevShoppingList.itemList.findIndex((currentItem) => currentItem.id === item.id);
        let result = { ...prevShoppingList };
        result.itemList[editedIndex].isResolved
          ? (result.itemList[editedIndex].isResolved = false)
          : (result.itemList[editedIndex].isResolved = true);
        return result;
      });
    }

    function addItem(itemValue) {
      setShoppingList((prevShoppingList) => {
        let result = { ...prevShoppingList };
        let addedItem = {
          id: Utils.String.generateId(),
          value: itemValue.value,
          isResolved: false,
        };
        result.itemList.push(addedItem);
        return result;
      });
    }

 
    function editTitle(title) {
      setShoppingList((prevShoppingList) => {
        let result = {...prevShoppingList, name:title}
        return result;
      });
    }

    function archive() {
      setShoppingList((prevShoppingList) => {
        let result = {...prevShoppingList, isArchived:true}
        console.log(result);
        return result;
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    const value = { shoppingList, remove, editItem, resolve, addItem,editTitle,archive };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DataProvider };
export default DataProvider;
//@@viewOff:exports
