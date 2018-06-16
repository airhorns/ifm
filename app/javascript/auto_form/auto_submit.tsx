import * as React from "react";
import * as _ from "lodash";
import { Form } from "semantic-ui-react";
import { AutoFormStateContainer } from "./auto_form_state_container";

export interface IAutoSubmitProps {
  children?: React.ReactNode;
}

export type AutoSubmit = React.ComponentType<IAutoSubmitProps>;

export const AutoSubmitFactory = (form: AutoFormStateContainer<any, any>): AutoSubmit => {
  return class AutoSubmitComponent extends React.Component<IAutoSubmitProps, {}> {
    public buttonText() {
      const rootObjectName = _.capitalize(form.inputRootFieldName());
      const rootObject = form.state.formState[form.inputRootFieldName()];
      if (rootObject) {
        if (_.isUndefined(rootObject.id)) {
          return `Create ${rootObjectName}`;
        } else {
          return `Update ${rootObjectName}`;
        }
      } else {
        return `Submit ${rootObjectName}`;
      }
    }

    public render() {
      return <Form.Button floated="right">{this.props.children || this.buttonText()}</Form.Button>;
    }
  };
};
