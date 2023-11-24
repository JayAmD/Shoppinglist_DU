const Errors = require("../errors/shoppinglist-error");

const Warnings = {
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
  },
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
  },
  Leave: {
    UnsupportedKeys: {
      code: `${Errors.Leave.UC_CODE}unsupportedKeys`,
    },
  },
  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },
  ItemAdd: {
    UnsupportedKeys: {
      code: `${Errors.ItemAdd.UC_CODE}unsupportedKeys`,
    },
  },
  ItemUpdate: {
    UnsupportedKeys: {
      code: `${Errors.ItemUpdate.UC_CODE}unsupportedKeys`,
    },
  },
  ItemDelete: {
    UnsupportedKeys: {
      code: `${Errors.ItemDelete.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;