"use strict";

const ShoppinglistAbl = require("../../abl/shoppinglist-abl");

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
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.list(dtoIn);
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

    return ShoppinglistAbl.creitemAddate(dtoIn);
  }

  itemUpdate(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.itemUpdate(dtoIn);
  }

  itemDelte(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.itemDelte(dtoIn);
  }
}

module.exports = new ShoppinglistController();
