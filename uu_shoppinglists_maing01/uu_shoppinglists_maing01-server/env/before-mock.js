db.shoppinglist.insertMany([{
  _id: ObjectId("11e1556d17f0e248baf15f4b"),
  awid: "22222222222222222222222222222222", //appWorkspaceId - unique code specified externally
  sys: {
    cts: "2022-01-14 10:50:21.637Z", //create timestamp
    mts: "2022-01-14 10:50:42.542Z", //modification timestamp
    rev: 0, //revision number
  },
  name: "Groceries", // shoppinglist name - mandatory; length is limited to 1-255 characters
  isArchived: false,
  ownerId: "8780-522-7322-0000", //TADY MISTO uuIdentity
  memberIdList: ["22", "33"], // array of member ids
  itemList: [
    {
      id: ObjectId("61e1554617f0e248baf15f42"), //generated unique code
      value: "potatos", // item value; length is limited to 1-255 characters
      isResolved: false,
    },
    {
      id: ObjectId("91e1554617f0e248baf15f42"), //generated unique code
      value: "carrot", // item value; length is limited to 1-255 characters
      isResolved: true,
    },
    {
      id: ObjectId("64e1554617f0e248baf15f42"), //generated unique code
      value: "salt", // item value; length is limited to 1-255 characters
      isResolved: false,
    },
  ],
},
{
  _id: ObjectId("223ebf71c50ed33d7c03dda9"), //generated unique code
  awid: "22222222222222222222222222222222", //appWorkspaceId - unique code specified externally
  sys: {
    cts: "2022-01-14 12:50:21.637Z", //create timestamp
    mts: "2022-01-14 12:50:42.542Z", //modification timestamp
    rev: 0, //revision number
  },
  name: "Cars", // shoppinglist name - mandatory; length is limited to 1-255 characters
  isArchived: true,
  ownerId: "22", //id of the owner
  memberIdList: ["11"], // array of member ids
  itemList: [
    {
      id: ObjectId("61e8554617f0e248baf15f42"), //generated unique code
      value: "Ferarry", // item value; length is limited to 1-255 characters
      isResolved: false,
    },
    {
      id: ObjectId("91e1554617f0e248baf15f42"), //generated unique code
      value: "Porshe", // item value; length is limited to 1-255 characters
      isResolved: true,
    },
    {
      id: ObjectId("64e1554617f0e248baf15f42"), //generated unique code
      value: "Mustang gtx", // item value; length is limited to 1-255 characters
      isResolved: false,
    },
  ],
},
{
  id: ObjectId("33e1556d17f0e248baf15f4b"), //generated unique code
  awid: "583ebf71c50ed33d7c03dda9", //appWorkspaceId - unique code specified externally
  sys: {
    cts: "2022-01-14 10:50:21.637Z", //create timestamp
    mts: "2022-01-14 10:50:42.542Z", //modification timestamp
    rev: 0, //revision number
  },
  name: "Books", // shoppinglist name - mandatory; length is limited to 1-255 characters
  isArchived: false,
  ownerId: "11", //id of the owner
  memberIdList: [ "33"], // array of member ids
  itemList: [
    {
      id: ObjectId("61e1554617f0e248baf15f42"), //generated unique code
      value: "GoT", // item value; length is limited to 1-255 characters
      isResolved: false,
    },
    {
      id: ObjectId("91e1554617f0e248baf15f42"), //generated unique code
      value: "LoTR", // item value; length is limited to 1-255 characters
      isResolved: true,
    },
    {
      id: ObjectId("64e1554617f0e248baf15f42"), //generated unique code
      value: "42", // item value; length is limited to 1-255 characters
      isResolved: false,
    },
    {
      id: ObjectId("74e1554617f0e248baf15f42"), //generated unique code
      value: "Harry Poter", // item value; length is limited to 1-255 characters
      isResolved: false,
    },
  ],
}]
);

