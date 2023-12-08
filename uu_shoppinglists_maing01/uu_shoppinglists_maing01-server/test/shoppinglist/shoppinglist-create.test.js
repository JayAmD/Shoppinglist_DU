const { TestHelper } = require("uu_appg01_server-test");
const Path = require("path");

const ERROR_PREFIX = "uu-shoppinglists-main/shoppinglist/";
const USE_CASE = "/create";

beforeAll(async () => {});
beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Shoppinglist Create uuCMD tests", () => {
  test("HDS", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
      name: "Buildings",
      memberIdList: ["8156-5151-6521-0000"],
      itemList: ["Castle", "Skyscraper", "Cottage"],
    };

    let dtoOut = await TestHelper.executePostCommand("shoppinglist/create", dtoIn, session);

    expect(dtoOut.status).toEqual(200);
    expect(dtoOut.uuAppErrorMap).toEqual({});
    expect(dtoOut.data).toEqual(
      expect.objectContaining({
        awid: "22222222222222222222222222222222",
        name: "Buildings",
        isArchived: false,
        ownerId: "3039-912-8064-0000",
        memberIdList: ["8156-5151-6521-0000"],
        itemList: expect.arrayContaining([
          expect.objectContaining({ value: "Castle", isResolved: false }),
          expect.objectContaining({ value: "Skyscraper", isResolved: false }),
          expect.objectContaining({ value: "Cottage", isResolved: false }),
        ]),
      })
    );
  });
  test("unsupportedKeys -1.2.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
      name: "Buildings",
      memberIdList: ["8156-5151-6521-0000"],
      itemList: ["Castle", "Skyscraper", "Cottage"],
      wha:"haha"
    };

    let dtoOut = await TestHelper.executePostCommand("shoppinglist/create", dtoIn, session);

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
    );    expect(dtoOut.data).toEqual(
      expect.objectContaining({
        awid: "22222222222222222222222222222222",
        name: "Buildings",
        isArchived: false,
        ownerId: "3039-912-8064-0000",
        memberIdList: ["8156-5151-6521-0000"],
        itemList: expect.arrayContaining([
          expect.objectContaining({ value: "Castle", isResolved: false }),
          expect.objectContaining({ value: "Skyscraper", isResolved: false }),
          expect.objectContaining({ value: "Cottage", isResolved: false }),
        ]),
      })
    );
  });

  test("invalidDtoIn -1.3.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = {
     
     
    };   
     try {
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/create", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}invalidDtoIn`);
      expect(e.message).toEqual("DtoIn is not valid.");
    }
  });

  test("invalidName -3.1", async () => {
    expect.assertions(3);

    let session = await TestHelper.login("Bean");

    let dtoIn = { name:"   " };
    try {
      let dtoOut = await TestHelper.executePostCommand("shoppinglist/create", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(`${ERROR_PREFIX}${USE_CASE}invalidName`);
      expect(e.message).toEqual("Invalid name - it cannot have no characters or be of zero length.");
    }
  });

 
});
