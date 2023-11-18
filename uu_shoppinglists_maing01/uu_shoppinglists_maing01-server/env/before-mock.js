// if you don't use the default awid, change that everywhere aswell
db.createCollection("shoppinglist");
db.shoppinglist.insert({
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
});

