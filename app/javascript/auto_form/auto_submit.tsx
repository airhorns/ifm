import * as React from "react";
import * as _ from "lodash";
import { Form, FormButtonProps } from "semantic-ui-react";
import { AutoFormStateContainer } from "./auto_form_state_container";

export interface IAutoSubmitProps extends FormButtonProps {
  children?: React.ReactNode;
}

export type AutoSubmit = React.ComponentType<IAutoSubmitProps>;

export const AutoSubmitFactory = (form: AutoFormStateContainer<any, any>): AutoSubmit => {
  return class AutoSubmitComponent extends React.Component<IAutoSubmitProps, {}> {
    public buttonText() {
      const rootObjectName = form.resourceName();
      if (_.isUndefined(form.resourceID())) {
        return `Create ${rootObjectName}`;
      } else {
        return `Update ${rootObjectName}`;
      }
    }

    public render() {
      return <Form.Button {...this.props} floated="right">{this.props.children || this.buttonText()}</Form.Button>;
    }
  };
};
