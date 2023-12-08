const { TestHelper } = require("uu_appg01_server-test");
const Path = require("path");

const ERROR_PREFIX = "uu-shoppinglists-main/shoppinglist/";
const USE_CASE = "/update";

beforeAll(async () => {});
beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
  await TestHelper.executeDbScript(Path.join(__dirname, "mock-data.js"));
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Shoppinglist Update uuCMD tests", () => {
  test("HDS", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
      id: "11e1556d17f0e248baf15f4b",
      isArchived: true,
    };

    let dtoOut = await TestHelper.executePostCommand("shoppinglist/update", dtoIn, session);

    expect(dtoOut.status).toEqual(200);
    expect(dtoOut.uuAppErrorMap).toEqual({});
    expect(dtoOut.data).toEqual(
      expect.objectContaining({
        awid: "22222222222222222222222222222222",
        sys: expect.objectContaining({
          cts: "2022-01-14 10:50:21.637Z",
          rev: 1,
        }),
        name: "Groceries",
        isArchived: true,
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
      isArchived: true,
      wha: "haha",
    };

    let dtoOut = await TestHelper.executePostCommand("shoppinglist/update", dtoIn, session);

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
        sys: expect.objectContaining({
          cts: "2022-01-14 10:50:21.637Z",
          rev: 1,
        }),
        name: "Groceries",
        isArchived: true,
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
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/update", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}invalidDtoIn`);
      expect(e.message).toEqual("DtoIn is not valid.");
    }
  });

  test("invalidName -3.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = { id: "11e1556d17f0e248baf15f4b", name: "   " };
    try {
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/update", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}invalidName`);
      expect(e.message).toEqual("Invalid name - it cannot have no characters or be of zero length.");
    }
  });

  test("shoppinglistDoesNotExist -4.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {id:"61e1554617f0e248baf15f42"};
    try {
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/update", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}shoppinglistDoesNotExist`);
      expect(e.message).toEqual("Shoppinglist does not exist.");
    }
  });

  test("UserNotAuthorized -5.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {id:"223ebf71c50ed33d7c03dda9"};
    try {
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/update", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}userNotAuthorized`);
      expect(e.message).toEqual("User not authorized.");
    }
  });

});
