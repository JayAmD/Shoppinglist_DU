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
  ShoppinglistsMainDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}shoppinglistsMainDoesNotExist`;
      this.message = "UuObject shoppinglistsMain does not exist.";
    }
  },
  ShoppinglistsMainNotInCorrectState: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}shoppinglistsMainNotInCorrectState`;
      this.message = "UuObject shoppinglistsMain is not in correct state.";
    }
  },
};

const Get = {
  UC_CODE: `${SHOPPINGLIST_ERROR_PREFIX}/get`,

  invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppinglistsMainDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}shoppinglistsMainDoesNotExist`;
      this.message = "UuObject shoppinglistsMain does not exist.";
    }
  },
  ShoppinglistsMainNotInCorrectState: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}shoppinglistsMainNotInCorrectState`;
      this.message = "UuObject shoppinglistsMain is not in correct state.";
    }
  },
  ShoppinglistDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}shoppinglistDoesNotExist`;
      this.message = "Shoppinglist does not exist.";
    }
  }
}

const Create = {
  UC_CODE: `${SHOPPINGLIST_ERROR_PREFIX}/create`,

  invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppinglistsMainDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}shoppinglistsMainDoesNotExist`;
      this.message = "UuObject shoppinglistsMain does not exist.";
    }
  },
  ShoppinglistsMainNotInCorrectState: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}shoppinglistsMainNotInCorrectState`;
      this.message = "UuObject shoppinglistsMain is not in correct state.";
    }
  },
  InvalidName: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidName`;
      this.message = "Invalid name - it cannot have no characters or be of zero length.";
    }
  },
  
  ShoppinglistDaoCreateFailed: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}shoppinglistDaoCreateFailed`;
      this.message = "Create shoppinglist by shoppinglist DAO create failed.";
    }
  },
}

const Update = {
  UC_CODE: `${SHOPPINGLIST_ERROR_PREFIX}/update`,

  invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppinglistsMainDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shoppinglistsMainDoesNotExist`;
      this.message = "UuObject shoppinglistsMain does not exist.";
    }
  },
  ShoppinglistsMainNotInCorrectState: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shoppinglistsMainNotInCorrectState`;
      this.message = "UuObject shoppinglistsMain is not in correct state.";
    }
  },
  InvalidName: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidName`;
      this.message = "Invalid name - it cannot have no characters or be of zero length.";
    }
  },
  ShoppinglistDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shoppinglistDoesNotExist`;
      this.message = "Shoppinglist does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ShoppinglistDaoUpdateFailed: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shoppinglistDaoUpdateFailed`;
      this.message = "Update shoppinglist by shoppinglist DAO update failed.";
    }
  },
}

const Delete = {
  UC_CODE: `${SHOPPINGLIST_ERROR_PREFIX}/delete`,

  invalidDtoIn: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppinglistsMainDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}shoppinglistsMainDoesNotExist`;
      this.message = "UuObject shoppinglistsMain does not exist.";
    }
  },
  ShoppinglistsMainNotInCorrectState: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}shoppinglistsMainNotInCorrectState`;
      this.message = "UuObject shoppinglistsMain is not in correct state.";
    }
  },
  ShoppinglistDoesNotExist: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}shoppinglistDoesNotExist`;
      this.message = "Shoppinglist does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoppinglistsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
}
//Old ones down from here


 
  
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
