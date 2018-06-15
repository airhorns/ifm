import * as React from "react";
import { InputOnChangeData, DropdownProps } from "semantic-ui-react";
import { AutoFormStateContainer } from "./auto_form_state_container";

export interface IAutoFormWrappeeRequiredProps {
  onChange?: (event: React.SyntheticEvent, data?: InputOnChangeData | DropdownProps) => void;
  defaultValue?: string | number | Array<number | string>;
}

export interface IAutoFormInputRequiredProps {
  name: string;
}

export type AutoFormInput<Props> = React.ComponentType<Props & IAutoFormInputRequiredProps>;

export const autoInputFactory = <Props extends IAutoFormWrappeeRequiredProps>(
  form: AutoFormStateContainer<any, any, any>,
  InputComponent: React.ComponentType<Props> | TrustedFormInputType,
): AutoFormInput<Props> => {
  return class ExtendedAutoFormInput extends React.Component<Props & IAutoFormInputRequiredProps> {
    public render() {
      return <InputComponent onChange={form.handleChange} {...this.props} defaultValue={form.getValue(this.props.name)}/>;
    }
  };
};

// Hacks to extend semantic-ui-react to report that there is in fact an onChange handler on a Form.Field
export type TrustedFormInputType = React.ComponentType<IAutoFormInputRequiredProps>;
