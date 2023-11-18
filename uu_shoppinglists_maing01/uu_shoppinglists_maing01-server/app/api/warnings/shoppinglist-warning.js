const Errors = require("../errors/shoppinglist-error");

const Warnings = {
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;