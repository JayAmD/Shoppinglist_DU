const { TestHelper } = require("uu_appg01_server-test");
const Path = require("path");

const ERROR_PREFIX = "uu-shoppinglists-main/shoppinglist/";
const USE_CASE = "/delete";

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

describe("Shoppinglist Delete uuCMD tests", () => {
  test("HDS", async () => {
    expect.assertions(2);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
      id: "11e1556d17f0e248baf15f4b",
     
    };

    let dtoOut = await TestHelper.executePostCommand("shoppinglist/delete", dtoIn, session);

    expect(dtoOut.status).toEqual(200);
    expect(dtoOut.uuAppErrorMap).toEqual({});
  });

  test("unsupportedKeys -1.2.1", async () => {
    expect.assertions(2);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
      id: "11e1556d17f0e248baf15f4b",
      wha: "haha",
    };

    let dtoOut = await TestHelper.executePostCommand("shoppinglist/delete", dtoIn, session);

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
   
  });

  test("invalidDtoIn -1.3.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {};
    try {
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/delete", dtoIn, session);
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
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/delete", dtoIn, session);
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
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/delete", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}userNotAuthorized`);
      expect(e.message).toEqual("User not authorized.");
    }
  });

});
