"use stirct";

const ShoppinglistsMainUseCaseError = require("./shoppinglists-main-use-case-error");
const SHOPPINGLIST_ERROR_PREFIX = `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/`;

const List = {
  UC_CODE: `${SHOPPINGLIST_ERROR_PREFIX}/list`,

  invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppinglistsDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}shoppinglistsDoesNotExist`;
      this.message = "UuObject shoppinglists does not exist.";
    }
  },
  ShoppinglistsNotInCorrectState: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}shoppinglistsNotInCorrectState`;
      this.message = "UuObject shoppinglists is not in correct state.";
    }
  },
};
//Old ones down from here

const Create = {
  UC_CODE: `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/create`,

  invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
};

const Get = {
    UC_CODE: `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/get`,
  
    invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Get.UC_CODE}/invalidDtoIn`;
        this.message = `DtoIn is not valid.`;
      }
    },
  };
 
  const Update = {
    UC_CODE: `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/update`,
  
    invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Update.UC_CODE}/invalidDtoIn`;
        this.message = `DtoIn is not valid.`;
      }
    },
  };
  const Leave = {
    UC_CODE: `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/leave`,
  
    invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Leave.UC_CODE}/invalidDtoIn`;
        this.message = `DtoIn is not valid.`;
      }
    },
  };
  const Delete = {
    UC_CODE: `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/delete`,
  
    invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Delete.UC_CODE}/invalidDtoIn`;
        this.message = `DtoIn is not valid.`;
      }
    },
  };
  const ItemAdd = {
    UC_CODE: `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/itemAdd`,
  
    invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${ItemAdd.UC_CODE}/invalidDtoIn`;
        this.message = `DtoIn is not valid.`;
      }
    },
  };
  const ItemUpdate = {
    UC_CODE: `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/itemUpdate`,
  
    invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${ItemUpdate.UC_CODE}/invalidDtoIn`;
        this.message = `DtoIn is not valid.`;
      }
    },
  };
  const ItemDelete = {
    UC_CODE: `${ShoppinglistsMainUseCaseError.ERROR_PREFIX}shoppinglist/itemDelete`,
  
    invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${ItemDelete.UC_CODE}/invalidDtoIn`;
        this.message = `DtoIn is not valid.`;
      }
    },
  };
            
module.exports = {
  Create,
  Get,
  List,
  Update,
  Leave,
  Delete,
  ItemAdd,
  ItemUpdate,
  ItemDelete
};
