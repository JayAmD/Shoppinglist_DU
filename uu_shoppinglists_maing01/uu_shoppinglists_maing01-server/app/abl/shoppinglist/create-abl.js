"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/shoppinglist-error");
const Warnings = require("../../api/warnings/shoppinglist-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Shoppinglists } = require("../constants");
const { ObjectId } = require("bson");


class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("shoppinglistCreateDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    const addedValues = {
        isArchived: false,
      ownerId: session.getIdentity().getUuIdentity(),
    };

    const uuObject = {
      ...dtoIn,
      ...addedValues,
    };

    // hds 2
    const allowedStateRules = {
        [Profiles.AUTHENTICATED]: new Set([Shoppinglists.States.ACTIVE]),
    };
    // 2.1, 2.1.1, 2.2, 2.2.1, 2.2.2
    await InstanceChecker.ensureInstanceAndState(
      awid,
      allowedStateRules,
      authorizationResult,
      Errors.Create,
      uuAppErrorMap
    );

    // hds 3, 3.1
    if (dtoIn.name.trim().length === 0) {
      throw new Errors.Create.InvalidName({ uuAppErrorMap }, { name: dtoIn.name });
    }

    // hds 4
   
let itemList=[]
uuObject.itemList.map(itemValue=>{
    itemList.push({value:itemValue,
        _id:new ObjectId(),
        isResolved: false,
        })
})
uuObject.itemList=itemList

    // hds 6
    uuObject.awid = awid;
    let shoppinglist;

    try {
      shoppinglist = await this.dao.create(uuObject);
    } catch (e) {
      // 6.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.ShoppinglistDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 7
    const dtoOut = {
      ...shoppinglist,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new CreateAbl();