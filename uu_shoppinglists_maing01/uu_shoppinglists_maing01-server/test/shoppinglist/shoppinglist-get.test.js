const { TestHelper } = require("uu_appg01_server-test");
const ERROR_PREFIX = "uu-shoppinglists-main/shoppinglist/";
const USE_CASE = "/get";

beforeAll(async () => {});
beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
  await TestHelper.executeDbScript(`db.shoppinglist.insertMany([{
    _id: ObjectId("11e1556d17f0e248baf15f4b"),
    awid: "22222222222222222222222222222222", //appWorkspaceId - unique code specified externally
    sys: {
      cts: "2022-01-14 10:50:21.637Z", //create timestamp
      mts: "2022-01-14 10:50:42.542Z", //modification timestamp
      rev: 0, //revision number
    },
    name: "Groceries", // shoppinglist name - mandatory; length is limited to 1-255 characters
    isArchived: false,
    ownerId: "3039-912-8064-0000", //TADY MISTO uuIdentity
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
  
  `);
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Shoppinglist Get uuCMD tests", () => {
  test("HDS", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
      id: "11e1556d17f0e248baf15f4b",
    };

    let dtoOut = await TestHelper.executeGetCommand("shoppinglist/get", dtoIn, session);

    expect(dtoOut.status).toEqual(200);
    expect(dtoOut.uuAppErrorMap).toEqual({});
    expect(dtoOut.data).toEqual(
      expect.objectContaining({
        awid: "22222222222222222222222222222222",
        sys: {
          cts: "2022-01-14 10:50:21.637Z",
          mts: "2022-01-14 10:50:42.542Z",
          rev: 0,
        },
        name: "Groceries",
        isArchived: false,
        ownerId: "3039-912-8064-0000",
        memberIdList: ["22", "33"],
        itemList: [
          { id: "61e1554617f0e248baf15f42", value: "potatos", isResolved: false },
          { id: "91e1554617f0e248baf15f42", value: "carrot", isResolved: true },
          { id: "64e1554617f0e248baf15f42", value: "salt", isResolved: false },
        ],
        id: "11e1556d17f0e248baf15f4b",
      })
    );
  });
  test("unsupportedKeys -1.2.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
      id: "11e1556d17f0e248baf15f4b",
      wha: "hahaha",
    };

    let dtoOut = await TestHelper.executeGetCommand("shoppinglist/get", dtoIn, session);

    expect(dtoOut.status).toEqual(200);
    expect(dtoOut.uuAppErrorMap).toEqual(
      expect.objectContaining({
        [`${ERROR_PREFIX}${USE_CASE}unsupportedKeys`]: {
          message: "DtoIn contains unsupported keys.",
          paramMap: {
            unsupportedKeyList: ["$.wha"],
          },
          type: "warning",
        },
      })
    );
    expect(dtoOut.data).toEqual(
      expect.objectContaining({
        awid: "22222222222222222222222222222222",
        sys: {
          cts: "2022-01-14 10:50:21.637Z",
          mts: "2022-01-14 10:50:42.542Z",
          rev: 0,
        },
        name: "Groceries",
        isArchived: false,
        ownerId: "3039-912-8064-0000",
        memberIdList: ["22", "33"],
        itemList: [
          { id: "61e1554617f0e248baf15f42", value: "potatos", isResolved: false },
          { id: "91e1554617f0e248baf15f42", value: "carrot", isResolved: true },
          { id: "64e1554617f0e248baf15f42", value: "salt", isResolved: false },
        ],
        id: "11e1556d17f0e248baf15f4b",
      })
    );
  });

  test("invalidDtoIn -1.3.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {};
    try {
      let dtoOut = await TestHelper.executeGetCommand("shoppinglist/get", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}invalidDtoIn`);
      expect(e.message).toEqual("DtoIn is not valid.");
    }
  });

  test("shoppinglistDoesNotExist -3.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {id:"61e1554617f0e248baf15f42"};
    try {
      let dtoOut = await TestHelper.executeGetCommand("shoppinglist/get", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}shoppinglistDoesNotExist`);
      expect(e.message).toEqual("Shoppinglist does not exist.");
    }
  });

  test("UserNotAuthorized -4.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {id:"223ebf71c50ed33d7c03dda9"};
    try {
      let dtoOut = await TestHelper.executeGetCommand("shoppinglist/get", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}userNotAuthorized`);
      expect(e.message).toEqual("User not authorized.");
    }
  });
});
