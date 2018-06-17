import * as React from "react";
import { AutoFormStateContainer } from "./auto_form_state_container";

export interface ISendQueryFieldProps {
  name: string;
}

export type SendQueryField = React.ComponentType<ISendQueryFieldProps>;

export const SendQueryFieldFactory = (form: AutoFormStateContainer<any, any>): SendQueryField => {
  return class SendQueryFieldComponent extends React.Component<ISendQueryFieldProps, {}> {
    constructor(props: ISendQueryFieldProps) {
      super(props);
      form.seedFormState(this.props.name);
    }

    public render() { return null; }
  };
};
