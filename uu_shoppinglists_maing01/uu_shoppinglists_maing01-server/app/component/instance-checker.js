//@@viewOn:imports
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Schemas } = require("../abl/constants");
//@@viewOff:imports

//@@viewOn:components
class InstanceChecker {
  constructor() {
    this.dao = DaoFactory.getDao(Schemas.SHOPPINGLIST);
  }

  /**
   * Checks whether instance exists and is of proper state
   * @param {String} awid Used awid
   * @param {Set} states A map with allowed states
   * @param {Object} errors Object with error definitions
   * @param {Object} uuAppErrorMap Standard uuAppErrorMap
   * @returns {Promise<[]>} instance itself
   */
  async ensureInstanceAndState(awid, allowedStateRules, authorizationResult, errors, uuAppErrorMap = {}) {
    // HDS 1
    const shoppinglists = await this.ensureInstance(awid, errors, uuAppErrorMap);

    // // HDS 2 //authorizedProfiles nefunguje, nejspise proto, ze u sve UUidentity nemam nastaveny profil. Myslim si to protoze authorizedProfiles je prazdne
    // const authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    // // note: the "biggest" profile is always in first position
    // const allowedStates = allowedStateRules[authorizedProfiles[0]];

    // // HDS 3
    // if (!allowedStates.has(shoppinglists.state)) {
    //   throw new errors.ShoppinglistsNotInCorrectState(
    //     { uuAppErrorMap },
    //     {
    //       awid,
    //       state: shoppinglists.state,
    //       expectedState: Array.from(allowedStates),
    //     }
    //   );
    // }

    return shoppinglists;
  }

  /**
   * Checks whether instance exists
   * @param {String} awid Used awid
   * @param {Object} errors Object with error definitions
   * @param {Object} uuAppErrorMap Standard uuAppErrorMap
   * @returns {Promise<[]>} instance itself
   */
  async ensureInstance(awid, errors, uuAppErrorMap) {
    // HDS 1
    let shoppinglists = await this.dao.getByAwid(awid);

    // HDS 2
    if (!shoppinglists) {
      // 2.1.A
      throw new errors.ShoppinglistsDoesNotExist({ uuAppErrorMap }, { awid });
    }

    return shoppinglists;
  }
}
//@@viewOff:components

//@@viewOn:exports
module.exports = new InstanceChecker();
//@@viewOff:exports