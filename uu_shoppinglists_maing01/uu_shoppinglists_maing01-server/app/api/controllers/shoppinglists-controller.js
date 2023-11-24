"use strict";

const ShoppinglistAbl = require("../../abl/shoppinglist-abl");
const ListAbl = require("../../abl/shoppinglist/list-abl");
const GetAbl = require("../../abl/shoppinglist/get-abl");
const CreateAbl = require("../../abl/shoppinglist/create-abl");
const UpdateAbl = require("../../abl/shoppinglist/update-abl");
const DeleteAbl = require("../../abl/shoppinglist/delete-abl");
const LeaveAbl = require("../../abl/shoppinglist/leave-abl");
const ItemAddAbl = require("../../abl/shoppinglist/item-add-abl");
const ItemUpdateAbl = require("../../abl/shoppinglist/item-update-abl");
const ItemDeleteAbl = require("../../abl/shoppinglist/item-delete-abl");

class ShoppinglistController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  get(ucEnv) {
    return GetAbl.get(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  leave(ucEnv) {
    return LeaveAbl.leave(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  delete(ucEnv) {
    return DeleteAbl.delete(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  itemAdd(ucEnv) {
    return ItemAddAbl.itemAdd(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());

  }

  itemUpdate(ucEnv) {
    return ItemUpdateAbl.itemUpdate(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());

  }

  itemDelete(ucEnv) {
    return ItemDeleteAbl.itemDelete(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());

  }
}

module.exports = new ShoppinglistController();
