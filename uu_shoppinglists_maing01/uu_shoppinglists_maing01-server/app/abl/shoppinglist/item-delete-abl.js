"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/shoppinglist-error");
const Warnings = require("../../api/warnings/shoppinglist-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Shoppinglists } = require("../constants");
const { ObjectId } = require("bson");


class ItemDeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  async itemDelete(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("shoppinglistItemDeleteDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.ItemDelete.UnsupportedKeys.code,
      Errors.ItemDelete.invalidDtoIn
    );

    

    // hds 2
    const allowedStateRules = {
        [Profiles.AUTHENTICATED]: new Set([Shoppinglists.States.ACTIVE]),
    };
    // 2.1, 2.1.1, 2.2, 2.2.1, 2.2.2
    await InstanceChecker.ensureInstanceAndState(
      awid,
      allowedStateRules,
      authorizationResult,
      Errors.ItemDelete,
      uuAppErrorMap
    );

    const shoppinglist = await this.dao.get(awid, dtoIn.shoppinglistId);
    if (!shoppinglist) {
      // 3.1
      throw new Errors.ItemDelete.ShoppinglistDoesNotExist(uuAppErrorMap, { shoppinglistId: dtoIn.shoppinglistId });
    }

    const existsItem = shoppinglist.itemList.some((el) => {
      return el.id.toString() === dtoIn.itemId;
    });
    if (!existsItem) {
      // 3.1
      throw new Errors.ItemDelete.ShoppinglistItemDoesNotExist(uuAppErrorMap, {shoppinglistId:dtoIn.shoppinglistId,itemId:dtoIn.itemId    });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isOwner = uuIdentity === shoppinglist.ownerId;
    if (!isOwner) {
      // 5.1
      throw new Errors.ItemDelete.UserNotAuthorized({ uuAppErrorMap });
    } 

    let updatedShoppinglist;
    try {
      updatedShoppinglist = await this.dao.itemDelete(awid, dtoIn.shoppinglistId, dtoIn.itemId);
    } catch (e) {
      // 6.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.ItemDelete.ShoppinglistDaoItemDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...updatedShoppinglist,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new ItemDeleteAbl();