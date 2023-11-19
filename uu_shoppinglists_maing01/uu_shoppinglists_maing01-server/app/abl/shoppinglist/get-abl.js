"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/shoppinglist-error");
const Warnings = require("../../api/warnings/shoppinglist-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Shoppinglists } = require("../constants");

class GetAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  async get(awid, dtoIn, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("shoppinglistGetDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Get.UnsupportedKeys.code,
      Errors.Get.invalidDtoIn
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
      Errors.Get,
      uuAppErrorMap
    );

    // hds 3
    const shoppinglist = await this.dao.get(awid, dtoIn.id);
    if (!shoppinglist) {
      // 3.1
      throw new Errors.Get.ShoppinglistDoesNotExist(uuAppErrorMap, { shoppinglistId: dtoIn.id });
    }

    // hds 4
    const dtoOut = {
      ...shoppinglist,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new GetAbl();