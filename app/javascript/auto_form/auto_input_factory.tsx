import * as React from "react";
import * as _ from "lodash";
import { Form, InputOnChangeData, FormCheckboxProps, FormDropdownProps } from "semantic-ui-react";
import { AutoFormStateContainer } from "./auto_form_state_container";

type InputValueType = number | string | React.ReactText | boolean;

export interface IAutoFormWrappeeRequiredProps {
  onChange?: (event: React.FormEvent<HTMLInputElement>, data?: any) => void;
  defaultValue?: InputValueType | InputValueType[];
  value?: InputValueType | InputValueType[];
  checked?: boolean;
}

export interface IAutoFormInputRequiredProps {
  name: string;
}

export type AutoFormInput<Props> = React.ComponentType<Props & IAutoFormInputRequiredProps>;

interface IAutoFormInputState {
  value: InputValueType | InputValueType[];
}

export const AutoInputFactory = <Props extends IAutoFormWrappeeRequiredProps>(
  form: AutoFormStateContainer<any, any, any>,
  InputComponent: React.ComponentType<Props> | TrustedFormInputType,
): AutoFormInput<Props> => {
  return class ExtendedAutoFormInput extends React.Component<Props & IAutoFormInputRequiredProps, IAutoFormInputState> {
    public constructor(props: Props & IAutoFormInputRequiredProps) {
      super(props);
      form.seedFormState(this.props.name);
      this.state = { value: form.getSeedValue(this.props.name) };
    }

    public handleChange = (event: React.FormEvent<HTMLInputElement>, data: IAutoFormWrappeeRequiredProps) => {
      switch (InputComponent) {
        case Form.Checkbox:
          this.setValue(!!(data as FormCheckboxProps).checked);
          break;
        case Form.Dropdown:
          const value = (data as FormDropdownProps).value;
          if (_.isUndefined(value)) {
            throw new Error("Unexpected undefined value from form dropdown input");
          }
          this.setValue(value);
          break;
        default:
          this.setValue(event.currentTarget.value);
      }
    }

    public setValue(value: InputValueType | InputValueType[]) {
      this.setState({value});
      form.setValue(this.props.name, value);
    }

    public render() {
      switch (InputComponent) {
        case Form.Checkbox:
          return <Form.Checkbox onChange={this.handleChange} checked={this.state.value} {...this.props} />;
        default:
          return <InputComponent onChange={this.handleChange} value={this.state.value} {...this.props} />;
      }
    }
  };
};

// Hacks to extend semantic-ui-react to report that there is in fact an onChange handler on a Form.Field
export type TrustedFormInputType = React.ComponentType<IAutoFormInputRequiredProps>;
