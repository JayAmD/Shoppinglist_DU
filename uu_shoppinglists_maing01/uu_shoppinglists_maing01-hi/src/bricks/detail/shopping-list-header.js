//@@viewOn:imports
import { createVisualComponent, Utils, Content,PropTypes, useState } from "uu5g05";
import Config from "./config/config.js";

import Uu5Forms from "uu5g05-forms";
import { Dropdown,Text, useAlertBus } from "uu5g05-elements";
import { useUserContext } from "../users/user-context.js";

//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    display: "flex",
      padding: 4,
  }),
  
};
//@@viewOff:css

//@@viewOn:helpers
function withControlledInput(Input) {
  return (props) => {
    const { value: propsValue, onChange } = props;

    const [value, setValue] = useState(propsValue);

    return (
      <div>
        <Input
          {...props}
          value={value}
          onChange={(e) => {
            typeof onChange === "function" && onChange(e);
            setValue(e.data.value);
          }}
        />
      </div>
    );
  };
}

const TextInput = withControlledInput(Uu5Forms.Text);
//@@viewOff:helpers

const ShoppingListHeader = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListHeader",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    title: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const [isEditableTitle, setIsEditableTitle] = useState(false);
    const { addAlert } = useAlertBus();
    const {loggedUser} = useUserContext();



    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    const itemList = [
      {
        children: "Edit title",
        icon: "uugds-pencil",
        onClick:handleEditableTitle
      },
      {
        children: "Archive",
        icon: "uugds-folder",
        onClick:handleArchive
      },
     
    ]

    function handleEditableTitle() {
      setIsEditableTitle((prevState)=>{
        let result =prevState
        prevState?result= false:result= true
        return result
      })
      
    }
    

    

    function handleEditTitle(event) {
      const newEvent = new Utils.Event(event.data.value, event); //TODO: Opet jako u componenty Item, si nejsem jist jak Utils.Event funguje
      const title = newEvent.data;
      try {
        props.onEditTitle(title);
        
      } catch (error) {
        ShoppingListHeader.logger.error("Error changing the title", error);
        showError(error, "List title edition failed!");
      }
    
    }
    function handleArchive() {
      
      try {
        props.onArchive();
        addAlert({
          message: `The list has been archived.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ShoppingListHeader.logger.error("Error archiving the title", error);
        showError(error, "List archivation failed!");
      }
    
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListHeader);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Text category="interface" segment="title" type="common">
          {isEditableTitle?
                  <TextInput autoFocus value={props.title} onChange={handleEditTitle} />
                :props.title}
       { loggedUser.id===props.ownerId&&<Dropdown label="Actions" itemList={itemList}/>}
        </Text>
          
          
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListHeader };
export default ShoppingListHeader;
//@@viewOff:exports
