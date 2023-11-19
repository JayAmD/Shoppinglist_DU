"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/shoppinglist-error");
const Warnings = require("../../api/warnings/shoppinglist-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Shoppinglists } = require("../constants");


class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("shoppinglistDeleteDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.invalidDtoIn
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
      Errors.Delete,
      uuAppErrorMap
    );

  
 // hds 4
 const shoppinglist = await this.dao.get(awid, dtoIn.id);
 if (!shoppinglist) {
   // 4.1
   throw new Errors.Delete.ShoppinglistDoesNotExist({ uuAppErrorMap }, { shoppinglistId: dtoIn.id });
 }

 // hds 5
 const uuIdentity = session.getIdentity().getUuIdentity();
 const isOwner = uuIdentity === shoppinglist.ownerId
 if (!isOwner) {
   // 5.1
   throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap });
 }


  // hds 7
  await this.dao.delete(awid, dtoIn.id);

 return { uuAppErrorMap };
  }
}

module.exports = new DeleteAbl();