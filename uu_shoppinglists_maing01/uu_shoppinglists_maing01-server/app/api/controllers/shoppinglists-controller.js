"use strict";

const ShoppinglistAbl = require("../../abl/shoppinglist-abl");
const ListAbl = require("../../abl/shoppinglist/list-abl")


class ShoppinglistController {
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.create(dtoIn);
  }

  get(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.get(dtoIn);
  }

   list(ucEnv) {

    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.update(dtoIn);
  }

  leave(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.leave(dtoIn);
  }

  delete(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.delete(dtoIn);
  }

  itemAdd(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.itemAdd(dtoIn);
  }

  itemUpdate(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.itemUpdate(dtoIn);
  }

  itemDelete(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.itemDelete(dtoIn);
  }
}

module.exports = new ShoppinglistController();
