"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class ShoppinglistMongo extends UuObjectDao {
  constructor(...args) {
    super(...args);
  }

  async createSchema() {
    await super.createIndex({ awid: 1, ownerId:1, memberIdList:1}, { unique: false });
    await super.createIndex({ awid: 1, _id: 1, "itemList.id": 1 }, { unique: true });

  }

  // create DAO method

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  // get DAO method

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  // update DAO method

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  // leave DAO method

  async leave(awid, id, uuIdentity) {
    let filter = { awid, id };
    await super.findOneAndUpdate(filter, { $pull: { memberIdList: uuIdentity } }, "NONE");
  }

  // delete DAO method

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }

  // list DAO method

  async list(awid, uuIdentity, sortBy, order, pageInfo) {
    const filter = { awid, $or: [{ ownerId: uuIdentity }, { memberIdList: uuIdentity }] };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }

  //itemAdd DAO method

  async itemAdd(awid, id, uuObject) {
    let filter = { awid, id };
    return await super.findOneAndUpdate(filter, { $push: { "itemList": uuObject } }, "NONE");
  }

  //itemUpdate DAO method

  async itemUpdate(awid, shoppingListId,itemId, data) {
    let filter = { awid, id:shoppingListId, "itemList.id":new ObjectId(itemId) };
    return await super.findOneAndUpdate(filter, { $set: { "itemList.$.value": data.value, "itemList.$.isResolved": data.isResolved} }, "NONE");
  }

  //itemDelete DAO method

  async itemDelete(awid, shoppingListId,itemId) {
    let filter = { awid, id:shoppingListId};
    return await super.findOneAndUpdate(filter, { $pull: { "itemList": {id:new ObjectId(itemId)}} }, "NONE");
  }

}

module.exports = ShoppinglistMongo;
