//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Form, FormText, FormSelect, FormFile, FormTextSelect, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config.js";
import { Modal } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  input: () => Config.Css.css({ marginBottom: 16 }),
  controls: () => Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" }),
};
//@@viewOff:css

//@@viewOn:helpers

//@@viewOff:helpers

const CreateForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    function handleValidate(event) {}
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    const formControls = (
      <div className={Css.controls()}>
        <CancelButton onClick={props.onCancel}>Cancel</CancelButton>
        <SubmitButton>Submit</SubmitButton>
      </div>
    );

    return (
      <Form {...elementProps} onSubmit={props.onSubmit} onValidate={handleValidate}>
        <Modal header="Create new shopping list" footer={formControls} open>
          <FormText label="Title" name="name" maxLength={255} className={Css.input()} required autoFocus />
          <FormTextSelect name="itemList" label="Add multiple items" itemList={[]} required insertable multiple />
          <FormTextSelect name="memberIdList" label="Add members(IDs)" itemList={[]} required insertable multiple />
        </Modal>
      </Form>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateForm };
export default CreateForm;
//@@viewOff:exports
