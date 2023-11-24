"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/shoppinglist-error");
const Warnings = require("../../api/warnings/shoppinglist-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Shoppinglists } = require("../constants");


class LeaveAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  async leave(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("shoppinglistLeaveDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Leave.UnsupportedKeys.code,
      Errors.Leave.invalidDtoIn
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
      Errors.Leave,
      uuAppErrorMap
    );

  
 // hds 4
 const shoppinglist = await this.dao.get(awid, dtoIn.id);
 if (!shoppinglist) {
   // 4.1
   throw new Errors.Leave.ShoppinglistDoesNotExist({ uuAppErrorMap }, { shoppinglistId: dtoIn.id });
 }

 // hds 5
 const uuIdentity = session.getIdentity().getUuIdentity();
 const isOwner = uuIdentity === shoppinglist.ownerId
 if (isOwner) {
   // 5.1
   throw new Errors.Leave.OwnerCannotLeave({ uuAppErrorMap });
 }

 const isMember = shoppinglist.memberIdList.includes(uuIdentity)
if(!isMember){
  throw new Errors.Leave.UserNotAuthorized({ uuAppErrorMap })
}

  // hds 7

  try {
    await this.dao.leave(awid, dtoIn.id,uuIdentity);
  } catch (e) {
    if (e instanceof ObjectStoreError) {
      // 10.1
      throw new Errors.Leave.ShoppinglistDaoLeaveFailed({ uuAppErrorMap }, e);
    }
    throw e;
  }

 return { uuAppErrorMap };
  }
}

module.exports = new LeaveAbl();