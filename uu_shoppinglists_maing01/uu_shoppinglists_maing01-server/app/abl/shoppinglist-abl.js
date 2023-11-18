const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const Errors = require("../api/errors/shoppinglist-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },

  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },

  leaveUnsupportedKeys: {
    code: `${Errors.Leave.UC_CODE}unsupportedKeys`,
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },

  itemAddUnsupportedKeys: {
    code: `${Errors.ItemAdd.UC_CODE}unsupportedKeys`,
  },

  itemUpdateUnsupportedKeys: {
    code: `${Errors.ItemUpdate.UC_CODE}unsupportedKeys`,
  },

  itemDeleteUnsupportedKeys: {
    code: `${Errors.ItemDelete.UC_CODE}unsupportedKeys`,
  },

  
};

class shoppinglistAbl {
  constructor() {
    this.validator = Validator.load();
  }

  create(dtoIn) {
    let validationResult = this.validator.validate("shoppinglistCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  get(dtoIn) {
    let validationResult = this.validator.validate("shoppinglistGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  list(dtoIn) {  //Obsolite
    let validationResult = this.validator.validate("shoppinglistListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  update(dtoIn) {
    let validationResult = this.validator.validate("shoppinglistUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  leave(dtoIn) {
    let validationResult = this.validator.validate("shoppinglistLeaveDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.leaveUnsupportedKeys.code,
      Errors.Leave.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  delete(dtoIn) {
    let validationResult = this.validator.validate("shoppinglistDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  itemAdd(dtoIn) {
    let validationResult = this.validator.validate("shoppinglistItemAddDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.itemAddUnsupportedKeys.code,
      Errors.ItemAdd.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  itemUpdate(dtoIn) {
    let validationResult = this.validator.validate("shoppinglistItemUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.itemUpdateUnsupportedKeys.code,
      Errors.ItemUpdate.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  itemDelete(dtoIn) {
    let validationResult = this.validator.validate("shoppinglistItemDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.itemDeleteUnsupportedKeys.code,
      Errors.ItemDelete.invalidDtoIn
    );

    let dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  
}

module.exports = new shoppinglistAbl();
