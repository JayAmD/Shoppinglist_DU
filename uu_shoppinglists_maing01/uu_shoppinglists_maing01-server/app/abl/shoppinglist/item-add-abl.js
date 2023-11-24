"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/shoppinglist-error");
const Warnings = require("../../api/warnings/shoppinglist-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Shoppinglists } = require("../constants");
const { ObjectId } = require("bson");


class ItemAddAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  async itemAdd(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("shoppinglistItemAddDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.ItemAdd.UnsupportedKeys.code,
      Errors.ItemAdd.invalidDtoIn
    );

    const addedValues = {
        isResolved: false,
        id:new ObjectId(),
    };

    const uuObject = {
      value:dtoIn.value,
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
      Errors.ItemAdd,
      uuAppErrorMap
    );

    const shoppinglist = await this.dao.get(awid, dtoIn.shoppinglistId);
    if (!shoppinglist) {
      // 3.1
      throw new Errors.ItemAdd.ShoppinglistDoesNotExist(uuAppErrorMap, { shoppinglistId: dtoIn.shoppinglistId });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isOwner = uuIdentity === shoppinglist.ownerId;
    const isMember = shoppinglist.memberIdList.includes(uuIdentity)
    if (!isOwner&&!isMember) {
      // 5.1
      throw new Errors.ItemAdd.UserNotAuthorized({ uuAppErrorMap });
    } 

    let updatedShoppinglist
    try {
      updatedShoppinglist = await this.dao.itemAdd(awid,dtoIn.shoppinglistId, uuObject);
    } catch (e) {
      // 6.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.ItemAdd.ShoppinglistDaoItemAddFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 7
    const dtoOut = {
      ...updatedShoppinglist,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new ItemAddAbl();