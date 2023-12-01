//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils,Lsi } from "uu5g05";
import { Form, FormText, FormSelect, FormFile, FormTextSelect, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config.js";
import { Modal } from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js"

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
        <CancelButton onClick={props.onCancel}>{<Lsi import={importLsi} path={["createForm", "cancel"]} />}</CancelButton>
        <SubmitButton>{<Lsi import={importLsi} path={["createForm", "submit"]} />}</SubmitButton>
      </div>
    );

    return (
      <Form {...elementProps} onSubmit={props.onSubmit} onValidate={handleValidate}>
        <Modal header={<Lsi import={importLsi} path={["createForm", "formTitle"]} />} footer={formControls} open>
          <FormText label={<Lsi import={importLsi} path={["createForm", "title"]} />} name="name" maxLength={255} className={Css.input()} required autoFocus />
          <FormTextSelect name="itemList" label={<Lsi import={importLsi} path={["createForm", "items"]} />} itemList={[]} required insertable multiple />
          <FormTextSelect name="memberIdList" label={<Lsi import={importLsi} path={["createForm", "members"]} />} itemList={[]} required insertable multiple />
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
