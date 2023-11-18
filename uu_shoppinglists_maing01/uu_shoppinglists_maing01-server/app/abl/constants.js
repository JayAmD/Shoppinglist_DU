//@@viewOn:constants
const Constants = {
    Schemas: {
      SHOPPINGLISTS_MAIN: "shoppinglistsMain",
      SHOPPINGLIST: "shoppinglist",
      // TODO: Add other schemas when you configure one in persistance.json and create mongo file for it
    },
  
    Shoppinglists: {
      States: {
        INIT: "init",
        ACTIVE: "active",
        UNDER_CONSTRUCTION: "underConstruction",
        CLOSED: "closed",
      },
      get NonFinalStates() {
        return new Set([this.States.ACTIVE, this.States.UNDER_CONSTRUCTION]);
      },
    },
  
    Profiles: {
      AUTHENTICATED: "Authenticated",
    },
  };
  //@@viewOff:constants
  
  //@@viewOn:exports
  module.exports = Constants;
  //@@viewOff:exports