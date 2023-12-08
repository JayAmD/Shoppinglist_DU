const { TestHelper } = require("uu_appg01_server-test");
const ERROR_PREFIX = "uu-shoppinglists-main/shoppinglist/";
const USE_CASE = "/list";
const Path = require("path");


beforeAll(async () => {});
beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
  await TestHelper.executeDbScript(Path.join(__dirname,"mock-data.js"));
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Shoppinglist List uuCMD tests", () => {
  test("HDS", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {};

    let dtoOut = await TestHelper.executeGetCommand("shoppinglist/list", dtoIn, session);

    expect(dtoOut.status).toEqual(200);
    expect(dtoOut.uuAppErrorMap).toEqual({});
    expect(dtoOut.data.itemList).toEqual(
      expect.arrayContaining(
        [
        
        {
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
        },
        {
          id: "33e1556d17f0e248baf15f4b", //generated unique code
          awid: "22222222222222222222222222222222", //appWorkspaceId - unique code specified externally
          sys: {
            cts: "2022-01-14 10:50:21.637Z", //create timestamp
            mts: "2022-01-14 10:50:42.542Z", //modification timestamp
            rev: 0, //revision number
          },
          name: "Books", // shoppinglist name - mandatory; length is limited to 1-255 characters
          isArchived: false,
          ownerId: "11", //id of the owner
          memberIdList: ["3039-912-8064-0000"], // array of member ids
          itemList: [
            {
              id: "61e1554617f0e248baf15f42", //generated unique code
              value: "GoT", // item value; length is limited to 1-255 characters
              isResolved: false,
            },
            {
              id: "91e1554617f0e248baf15f42", //generated unique code
              value: "LoTR", // item value; length is limited to 1-255 characters
              isResolved: true,
            },
            {
              id: "64e1554617f0e248baf15f42", //generated unique code
              value: "42", // item value; length is limited to 1-255 characters
              isResolved: false,
            },
            {
              id: "74e1554617f0e248baf15f42", //generated unique code
              value: "Harry Poter", // item value; length is limited to 1-255 characters
              isResolved: false,
            },
          ],
        }
      ]
      )
    );
  });
  test("unsupportedKeys -1.2.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
      id: "11e1556d17f0e248baf15f4b",
      wha: "hahaha",
    };

    let dtoOut = await TestHelper.executeGetCommand("shoppinglist/list", dtoIn, session);

    expect(dtoOut.status).toEqual(200);
    expect(dtoOut.uuAppErrorMap).toEqual(
      expect.objectContaining({
        [`${ERROR_PREFIX}${USE_CASE}unsupportedKeys`]: {
          message: "DtoIn contains unsupported keys.",
          paramMap: {
            unsupportedKeyList: ["$.id","$.wha"],
          },
          type: "warning",
        },
      })
    )
        expect(dtoOut.data.itemList).toEqual(
      expect.arrayContaining(
        [
        
        {
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
        },
        {
          id: "33e1556d17f0e248baf15f4b", //generated unique code
          awid: "22222222222222222222222222222222", //appWorkspaceId - unique code specified externally
          sys: {
            cts: "2022-01-14 10:50:21.637Z", //create timestamp
            mts: "2022-01-14 10:50:42.542Z", //modification timestamp
            rev: 0, //revision number
          },
          name: "Books", // shoppinglist name - mandatory; length is limited to 1-255 characters
          isArchived: false,
          ownerId: "11", //id of the owner
          memberIdList: ["3039-912-8064-0000"], // array of member ids
          itemList: [
            {
              id: "61e1554617f0e248baf15f42", //generated unique code
              value: "GoT", // item value; length is limited to 1-255 characters
              isResolved: false,
            },
            {
              id: "91e1554617f0e248baf15f42", //generated unique code
              value: "LoTR", // item value; length is limited to 1-255 characters
              isResolved: true,
            },
            {
              id: "64e1554617f0e248baf15f42", //generated unique code
              value: "42", // item value; length is limited to 1-255 characters
              isResolved: false,
            },
            {
              id: "74e1554617f0e248baf15f42", //generated unique code
              value: "Harry Poter", // item value; length is limited to 1-255 characters
              isResolved: false,
            },
          ],
        }
      ]
      )
    );
  });

 

});
