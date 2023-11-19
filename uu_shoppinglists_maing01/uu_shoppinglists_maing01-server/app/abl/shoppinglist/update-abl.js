"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/shoppinglist-error");
const Warnings = require("../../api/warnings/shoppinglist-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Shoppinglists } = require("../constants");
const { ObjectId } = require("bson");


class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("shoppinglistUpdateDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.invalidDtoIn
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
      Errors.Update,
      uuAppErrorMap
    );

   if(dtoIn.name){
    if (dtoIn.name.trim().length === 0) {
      throw new Errors.Update.InvalidName({ uuAppErrorMap }, { name: dtoIn.name });
    }
}
 // hds 4
 const shoppinglist = await this.dao.get(awid, dtoIn.id);
 if (!shoppinglist) {
   // 4.1
   throw new Errors.Update.ShoppinglistDoesNotExist({ uuAppErrorMap }, { shoppinglistId: dtoIn.id });
 }

 // hds 5
 const uuIdentity = session.getIdentity().getUuIdentity();
 const isOwner = uuIdentity === shoppinglist.ownerId
 if (!isOwner) {
   // 5.1
   throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
 }


 // hds 7, 7.1
 const toUpdate = { ...dtoIn };
 

 // hds 10
 toUpdate.awid = awid;
 let updatedShoppinglist;
 try {
   updatedShoppinglist = await this.dao.update(toUpdate);
 } catch (e) {
   if (e instanceof ObjectStoreError) {
     // 10.1
     throw new Errors.Update.ShoppinglistDaoUpdateFailed({ uuAppErrorMap }, e);
   }
   throw e;
 }

 // hds 11
 const dtoOut = {
   ...updatedShoppinglist,
   uuAppErrorMap,
 };

 return dtoOut;
  }
}

module.exports = new UpdateAbl();