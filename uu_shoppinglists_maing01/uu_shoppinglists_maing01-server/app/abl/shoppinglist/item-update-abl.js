"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/shoppinglist-error");
const Warnings = require("../../api/warnings/shoppinglist-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Shoppinglists } = require("../constants");
const { ObjectId } = require("bson");

class ItemUpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  async itemUpdate(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("shoppinglistItemUpdateDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.ItemUpdate.UnsupportedKeys.code,
      Errors.ItemUpdate.invalidDtoIn
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
      Errors.ItemUpdate,
      uuAppErrorMap
    );

    const shoppinglist = await this.dao.get(awid, dtoIn.shoppinglistId);
    if (!shoppinglist) {
      // 3.1
      throw new Errors.ItemUpdate.ShoppinglistDoesNotExist(uuAppErrorMap, { shoppinglistId: dtoIn.shoppinglistId });
    }

    const existsItem = shoppinglist.itemList.some((el) => {
      return el.id.toString() === dtoIn.item.id;
    });
    if (!existsItem) {
      // 3.1
      throw new Errors.ItemUpdate.ShoppinglistItemDoesNotExist(uuAppErrorMap, {shoppinglistId:dtoIn.shoppinglistId,itemId:dtoIn.item.id      });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isOwner = uuIdentity === shoppinglist.ownerId;
    const isMember = shoppinglist.memberIdList.includes(uuIdentity);
    if (!isOwner && !isMember) {
      // 5.1
      throw new Errors.ItemUpdate.UserNotAuthorized({ uuAppErrorMap });
    }
    let itemData = { ...dtoIn.item };
    delete itemData.id;

    if (!itemData.value) itemData.value = shoppinglist.itemList.find((item) => item.id.toString() === dtoIn.item.id).value;
    if (typeof itemData.isResolved !== "boolean")  itemData.isResolved = shoppinglist.itemList.find((item) => item.id.toString() === dtoIn.item.id).isResolved;

    let updatedShoppinglist;
    try {
      updatedShoppinglist = await this.dao.itemUpdate(awid, dtoIn.shoppinglistId, dtoIn.item.id, itemData);
    } catch (e) {
      // 6.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.ItemUpdate.ShoppinglistDaoItemUpdateFailed({ uuAppErrorMap }, e);
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

module.exports = new ItemUpdateAbl();
