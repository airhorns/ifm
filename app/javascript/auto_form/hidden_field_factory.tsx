import * as React from "react";
import { AutoFormStateContainer } from "./auto_form_state_container";

export interface IHiddenFieldProps {
  name: string;
  value: any;
}

export type HiddenField = React.ComponentType<IHiddenFieldProps>;

export const HiddenFieldFactory = (form: AutoFormStateContainer<any, any, any>): HiddenField => {
  return class HiddenFieldComponent extends React.Component<IHiddenFieldProps, {}> {
    constructor(props: IHiddenFieldProps) {
      super(props);
      form.setValue(this.props.name, this.props.value);
    }

    public render() { return null; }
  };
};
