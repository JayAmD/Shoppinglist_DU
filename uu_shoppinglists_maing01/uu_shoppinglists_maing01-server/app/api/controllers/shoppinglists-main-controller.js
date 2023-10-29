"use strict";
const ShoppinglistsMainAbl = require("../../abl/shoppinglists-main-abl.js");

class ShoppinglistsMainController {
  init(ucEnv) {
    return ShoppinglistsMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ShoppinglistsMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ShoppinglistsMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ShoppinglistsMainController();
