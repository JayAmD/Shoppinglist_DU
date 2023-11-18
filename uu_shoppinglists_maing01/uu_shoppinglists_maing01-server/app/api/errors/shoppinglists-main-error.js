"use strict";
const ShoppinglistsMainUseCaseError = require("./shoppinglists-main-use-case-error.js");

const SHOPPINGLISTS_MAIN_ERROR_PREFIX = `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglistsMain/`;

const Init = {
  UC_CODE: `${SHOPPINGLISTS_MAIN_ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  }, //Tento error je mozna obsolite, kdyztak smaz

  ShoppinglistsDaoCreateFailed: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}shoppinglistsDaoCreateFailed`;
      this.message = "Create shoppinglists by DAO method failed.";
    }
  },
};

const Load = {
  UC_CODE: `${SHOPPINGLISTS_MAIN_ERROR_PREFIX}load/`,

  ShoppinglistsMainDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}shoppinglistsMainDoesNotExist`;
      this.message = "UuObject shoppinglistsMain does not exist.";
    }
  },
};
module.exports = {
  Init,
  Load
};
