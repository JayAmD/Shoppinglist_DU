//@@viewOn:imports
import { createComponent, useState, Utils, useEffect, useDataList } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
// let initialShoppingListList = [
//   {
//     id: "11e1556d17f0e248baf15f4b", //generated unique code
//     awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
//     sys: {
//       cts: "2022-01-14 10:50:21.637Z", //create timestamp
//       mts: "2022-01-14 10:50:42.542Z", //modification timestamp
//       rev: 0, //revision number
//     },
//     name: "Groceries", // shoppinglist name - mandatory; length is limited to 1-255 characters
//     isArchived: false,
//     ownerId: "11", //id of the owner
//     memberIdList: ["22", "33"], // array of member ids
//     itemList: [
//       {
//         id: "61e1554617f0e248baf15f42", //generated unique code
//         value: "potatos", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//       {
//         id: "91e1554617f0e248baf15f42", //generated unique code
//         value: "carrot", // item value; length is limited to 1-255 characters
//         isResolved: true,
//       },
//       {
//         id: "64e1554617f0e248baf15f42", //generated unique code
//         value: "salt", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//     ],
//   },
  
//   {
//     id: "223ebf71c50ed33d7c03dda9", //generated unique code
//     awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
//     sys: {
//       cts: "2022-01-14 10:50:21.637Z", //create timestamp
//       mts: "2022-01-14 10:50:42.542Z", //modification timestamp
//       rev: 0, //revision number
//     },
//     name: "Cars", // shoppinglist name - mandatory; length is limited to 1-255 characters
//     isArchived: true,
//     ownerId: "22", //id of the owner
//     memberIdList: ["11"], // array of member ids
//     itemList: [
//       {
//         id: "61e8554617f0e248baf15f42", //generated unique code
//         value: "Ferarry", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//       {
//         id: "91e1554617f0e248baf15f42", //generated unique code
//         value: "Porshe", // item value; length is limited to 1-255 characters
//         isResolved: true,
//       },
//       {
//         id: "64e1554617f0e248baf15f42", //generated unique code
//         value: "Mustang gtx", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//     ],
//   },
//   {
//     id: "33e1556d17f0e248baf15f4b", //generated unique code
//     awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
//     sys: {
//       cts: "2022-01-14 10:50:21.637Z", //create timestamp
//       mts: "2022-01-14 10:50:42.542Z", //modification timestamp
//       rev: 0, //revision number
//     },
//     name: "Books", // shoppinglist name - mandatory; length is limited to 1-255 characters
//     isArchived: false,
//     ownerId: "11", //id of the owner
//     memberIdList: [ "33"], // array of member ids
//     itemList: [
//       {
//         id: "61e1554617f0e248baf15f42", //generated unique code
//         value: "GoT", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//       {
//         id: "91e1554617f0e248baf15f42", //generated unique code
//         value: "LoTR", // item value; length is limited to 1-255 characters
//         isResolved: true,
//       },
//       {
//         id: "64e1554617f0e248baf15f42", //generated unique code
//         value: "42", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//       {
//         id: "74e1554617f0e248baf15f42", //generated unique code
//         value: "Harry Poter", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//     ],
//   },
//   {
//     id: "44e1556d17f0e248baf15f4b", //generated unique code
//     awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
//     sys: {
//       cts: "2022-01-14 10:50:21.637Z", //create timestamp
//       mts: "2022-01-14 10:50:42.542Z", //modification timestamp
//       rev: 0, //revision number
//     },
//     name: "Office Supplies", // shoppinglist name - mandatory; length is limited to 1-255 characters
//     isArchived: false,
//     ownerId: "33", //id of the owner
//     memberIdList: [ "11","22"], // array of member ids
//     itemList: [
//       {
//         id: "61e1554617f0e248baf15f42", //generated unique code
//         value: "4x Pencils", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//       {
//         id: "91e1554617f0e248baf15f42", //generated unique code
//         value: "A lot of A4s", // item value; length is limited to 1-255 characters
//         isResolved: true,
//       },
//       {
//         id: "64e1554617f0e248baf15f42", //generated unique code
//         value: "Chair", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//       {
//         id: "74e1554617f0e248baf15f42", //generated unique code
//         value: "Powerful PC", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//     ],
//   },
//   {
//     id: "55e1556d17f0e248baf15f4b", //generated unique code
//     awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
//     sys: {
//       cts: "2022-01-14 10:50:21.637Z", //create timestamp
//       mts: "2022-01-14 10:50:42.542Z", //modification timestamp
//       rev: 0, //revision number
//     },
//     name: "Golf stuff", // shoppinglist name - mandatory; length is limited to 1-255 characters
//     isArchived: false,
//     ownerId: "22", //id of the owner
//     memberIdList: [ "33"], // array of member ids
//     itemList: [
//       {
//         id: "61e1554617f0e248baf15f42", //generated unique code
//         value: "Balls", // item value; length is limited to 1-255 characters
//         isResolved: true,
//       },
//       {
//         id: "91e1554617f0e248baf15f42", //generated unique code
//         value: "Car", // item value; length is limited to 1-255 characters
//         isResolved: true,
//       },
//       {
//         id: "64e1554617f0e248baf15f42", //generated unique code
//         value: "Green, yes the whole green", // item value; length is limited to 1-255 characters
//         isResolved: false,
//       },
//     ],
//   },
// ];//Obsolete

let user = [
  {
    id: "11", //generated unique code
    awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
    sys: {
      cts: "2022-01-14 10:50:21.637Z", //create timestamp
      mts: "2022-01-14 10:50:42.542Z", //modification timestamp
      rev: 0, //revision number
    },
    firstname: "Petr",
    surname: "Novák",
  },
  {
    id: "22", //generated unique code
    awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
    sys: {
      cts: "2022-01-14 10:50:21.637Z", //create timestamp
      mts: "2022-01-14 10:50:42.542Z", //modification timestamp
      rev: 0, //revision number
    },
    firstname: "Jan",
    surname: "Zima",
  },
  {
    id: "33", //generated unique code
    awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
    sys: {
      cts: "2022-01-14 10:50:21.637Z", //create timestamp
      mts: "2022-01-14 10:50:42.542Z", //modification timestamp
      rev: 0, //revision number
    },
    firstname: "Vojtech",
    surname: "Palacinka",
  },
];
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
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
    const [logedUser, setLogedUser] = useState(user[0]);


    const shoppinglistDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        delete: handleDelete,
      },
      pageSize: 20,
    });

    function handleLoad(dtoIn) {
      return Calls.Shoppinglist.list(dtoIn);
    }

   

    function handleCreate(values) {
      return Calls.Shoppinglist.create(values);
    }

    function handleDelete(shoppinglist) {
      const dtoIn = { id: shoppinglist.id };
      return Calls.Shoppinglist.delete(dtoIn);
    }




    // useEffect(() => {
    //   setShoppingListList((prev) => {
    //     let workableListList =[]
    //     if(typeof prev === "undefined"){
    //       workableListList=initialShoppingListList
    //     }
    //     else workableListList = [...prev,...initialShoppingListList]

    //     let mergedArr = [...new Set(workableListList)]

    //     const filteredList = mergedArr.filter((list) => {
    //       const isMember = list.memberIdList.includes(logedUser.id);
    //       return list.ownerId === logedUser.id || isMember;
    //     });
    //     return filteredList;
    //   });
    // }, [logedUser]);//Obsolete

   // const [shoppingListList, setShoppingListList] = useState();//Obsolete

    function switchLogedUser(value) {
      setLogedUser(() => {
        const result = user.find((element) => element.id === value);

        return result;
      });
    }

    // function onDeleteList(list) {
    //   setShoppingListList((prev) => {
    //     let filtered = prev.filter((element) => element.id !== list.id);

    //     return filtered;
    //   });
    // }

    // function create(values) {
    //   let itemList = [];
    //   values.itemList.map((item) => {
    //     const result = {
    //       value: item,
    //       id: Utils.String.generateId(),
    //       isResolved: false,
    //     };
    //     itemList.push(result);
    //   });
    //   const newList = {
    //     name: values.name,
    //     id: Utils.String.generateId(),
    //     awid: Utils.String.generateId(),
    //     sys: {
    //       cts: new Date().toISOString(),
    //       mts: new Date().toISOString(),
    //       rev: 0, //revision number
    //     },
    //     isArchived: false,
    //     ownerId: logedUser.id,
    //     memberIdList: values.memberIdList,
    //     itemList: itemList,
    //   };
    //   console.log(newList);
    //   setShoppingListList((prev) => [...prev, newList]);
    //   return newList;
    // }//Obsolete
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    // const value = { shoppingListList, create, logedUser, switchLogedUser, user, onDeleteList };
    // return typeof props.children === "function" ? props.children(value) : props.children; //@@viewOff:render
  


      const value = { shoppinglistDataList,logedUser, switchLogedUser, user};
    return typeof props.children === "function" ? props.children(value) : props.children;

  
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
