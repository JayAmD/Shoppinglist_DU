"use strict";
const { ObjectId } = require("bson");
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppinglistMongo extends UuObjectDao {
  constructor(...args) {
    super(...args);
  }

  async createSchema() {//TODO EDIT/update
    await super.createIndex({ awid: 1, _id: 1, "itemList._id": 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1 });//TODO ADD TO DOCUMENTION
  }

  
  // create DAO method
  
  async create(uuObject) {
    
    return await super.insertOne(uuObject);
  }

  // get DAO method
  
  async get(awid, id) {
    return await super.findOne({ id, awid });
  }
  
  // getByName DAO method
  
  // update DAO method
  
  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  // delete DAO method
  
  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }
    
  // list DAO method
  
  async list(awid, sortBy, order, pageInfo) {
    const filter = { awid };


    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }

}

module.exports = ShoppinglistMongo;