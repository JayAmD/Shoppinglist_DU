//@@viewOn:imports
import { createVisualComponent, Utils, Content,useRef,useRoute } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";

import { useUserContext } from "../users/user-context.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const UsersDrawer = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UsersDrawer",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, shoppingList, handleUpdate, leave } = props;
    const inputRef = useRef();
    const [, setRoute] = useRoute();

    const { userList, loggedUser } = useUserContext();

    const isOwner = shoppingList.ownerId === loggedUser.id;
    const isEditable = isOwner && !shoppingList.archived;

    function getUserList() {
      return shoppingList.memberIdList.map((memberId) => {
        const user = userList.find((item) => memberId === item.id);

        if (typeof user === "undefined") return "User not found";
        return (
          <Uu5Elements.Grid key={user.id} templateColumns={isEditable ? "auto max-content" : "100%"}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {user.name}
              {loggedUser.id === user.id && <div style={{ color: "blue", marginLeft: "8px" }}>*</div>}
            </div>
            {isEditable && (
              <Uu5Elements.Button
                icon={"uugds-delete"}
                colorScheme={"negative"}
                size={"xs"}
                significance={"subdued"}
                onClick={() => handleDeleteMember(user.id)}
              />
            )}
          </Uu5Elements.Grid>
        );
      });
    }

    function handleAddMember() {
      const updatedMemberIdList = [...shoppingList.memberIdList];
      console.log(inputRef.current);
      updatedMemberIdList.push(inputRef.current.value);
      console.log(updatedMemberIdList);
      handleUpdate(updatedMemberIdList);
    }
    function handleDeleteMember(userId) {
      const updatedMemberIdList = [...shoppingList.memberIdList];
      updatedMemberIdList.pop(userId);
      console.log(updatedMemberIdList);
      handleUpdate(updatedMemberIdList);
    }
    async function handleLeave() {
      
      await leave()
      setRoute("home")
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, UsersDrawer);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {userList.find((user) => user.id === shoppingList.ownerId)?.name}
            <div style={{ fontStyle: "italic", color: "grey", marginLeft: "8px" }}>(owner)</div>
            {isOwner && <div style={{ color: "blue", marginLeft: "8px" }}>*</div>}
          </div>

          <Uu5Elements.Line size={"s"} style={{ margin: "4px 0" }} significance={"subdued"} />
          {!isOwner && (
            <Uu5Elements.Button
              children="Leave the list"
              significance="highlighted"
              colorScheme="red"
              onClick={handleLeave}
              className={Config.Css.css({ marginBottom: 4 })}
            />
          )}
          {isOwner && (
            <Uu5Elements.Grid className={Config.Css.css({ marginBottom: 16, marginTop: 16 })}>
              <input placeholder="New memeber ID" ref={inputRef}></input>
              <Uu5Elements.Button
                children="Add new member"
                significance="highlighted"
                colorScheme="green"
                onClick={handleAddMember}
              />
            </Uu5Elements.Grid>
          )}
          <h3 style={{ display: "flex", alignItems: "center" }} className={Config.Css.css({ marginBottom: 4 })}>
            Members:{" "}
          </h3>
          {getUserList()}
        </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UsersDrawer };
export default UsersDrawer;
//@@viewOff:exports
