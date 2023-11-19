"use strict";

const ShoppinglistAbl = require("../../abl/shoppinglist-abl");
const ListAbl = require("../../abl/shoppinglist/list-abl")
const GetAbl = require("../../abl/shoppinglist/get-abl")
const CreateAbl = require("../../abl/shoppinglist/create-abl")
const UpdateAbl = require("../../abl/shoppinglist/update-abl")
const DeleteAbl = require("../../abl/shoppinglist/delete-abl")


class ShoppinglistController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());

  }

  get(ucEnv) {
    return GetAbl.get(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());

  }

   list(ucEnv) {

    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());

  }

  leave(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    return ShoppinglistAbl.leave(dtoIn);
  }

  delete(ucEnv) {
    return DeleteAbl.delete(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());

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
