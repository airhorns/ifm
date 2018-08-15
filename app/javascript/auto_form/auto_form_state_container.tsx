import * as React from "react";
import * as _ from "lodash";
import { Form, Input, InputProps, FormSelectProps, FormCheckboxProps, FormRadioProps, FormFieldProps, FormInputProps, FormDropdownProps, Message } from "semantic-ui-react";

import { AutoInputFactory, AutoFormInput, TrustedFormInputType } from "./auto_input_factory";
import { AutoFormNestedFields, IAutoFormNestedFieldsInstance, NestedFieldsFactory } from "./nested_fields";
import { SendQueryFieldFactory, SendQueryField } from "./send_query_field_factory";
import { AutoSubmit, AutoSubmitFactory } from "./auto_submit";

// All mutations that AutoForm works with have a root key of input that points to the fields of the object.
export interface IInputMutationVariables {
    input: object;
}

// Form state is the data that will get sent as the mutation variables. It's of the form {farm: {id: 1, name: foo}}
// for example, where there's one root field named after the resource which then has many fields representing that
// field's properties. For clarity, this root key is preserved in the form state, even though the *Input types
// for gql mutations don't have that root level argument, they just take the properties of the resource.
// If we're fetching a field named `farm`, we're going to mutate back the fields of `farm` as the input object, not
// those fields still wrapped in a field named `farm`.
// Form state is seeded by the query data where any keys of the same name are populated automatically into it.
export type IFormState<SeedData extends object, MutationVariables extends IInputMutationVariables> = {
[K in keyof SeedData]?: Partial<MutationVariables>
};

export interface IAutoFormStateContainerProps<SeedData extends object, MutationVariables extends IInputMutationVariables> {
  seedData: SeedData;
  rootFieldName: string;
  loading: boolean;
  success: boolean;
  onSubmit: (variables: MutationVariables) => void;
  children: (form: AutoFormStateContainer<SeedData, MutationVariables>, data: SeedData) => React.ReactNode;
}

export interface IAutoFormStateContainerState<SeedData extends object, MutationVariables extends IInputMutationVariables> {
  formState: IFormState<SeedData, MutationVariables>;
}

export class AutoFormStateContainer<SeedData extends object, MutationVariables extends IInputMutationVariables> extends
    React.Component<IAutoFormStateContainerProps<SeedData, MutationVariables>,
                    IAutoFormStateContainerState<SeedData, MutationVariables>> {

  public Input: AutoFormInput<FormInputProps>;
  public RawInput: AutoFormInput<InputProps>;
  public Field: AutoFormInput<FormFieldProps>;
  public Select: AutoFormInput<FormSelectProps>;
  public Dropdown: AutoFormInput<FormDropdownProps>;
  public Checkbox: AutoFormInput<FormCheckboxProps>;
  public Radio: AutoFormInput<FormRadioProps>;
  public SendQueryField: SendQueryField;
  public AutoSubmit: AutoSubmit;
  public Message = Message;
  public Group = Form.Group;

  public NestedFields: AutoFormNestedFields<SeedData>;
  private registeredNestedFieldsComponents: {[key: string]: IAutoFormNestedFieldsInstance<SeedData>};

  constructor(props: IAutoFormStateContainerProps<SeedData, MutationVariables>) {
    super(props);
    this.state = { formState: {} };
    this.registeredNestedFieldsComponents = {};
    this.Input = AutoInputFactory(this, Form.Input);
    this.RawInput = AutoInputFactory(this, Input);
    this.Select = AutoInputFactory(this, Form.Select);
    this.Dropdown = AutoInputFactory(this, Form.Dropdown);
    this.Radio = AutoInputFactory(this, Form.Radio);
    this.Checkbox = AutoInputFactory(this, Form.Checkbox);
    this.Field = AutoInputFactory(this, (Form.Field as TrustedFormInputType));
    this.SendQueryField = SendQueryFieldFactory(this);
    this.NestedFields = NestedFieldsFactory(this);
    this.AutoSubmit = AutoSubmitFactory(this);
  }

  public setValue(key: string, value: any) {
    this.setState((prevState) => {
      const formState = _.cloneDeep(prevState.formState);
      _.set(formState, key, value);
      return {formState};
    });
  }

  public registerNestedFields(componentInstance: IAutoFormNestedFieldsInstance<SeedData>) {
    this.registeredNestedFieldsComponents[componentInstance.props.name] = componentInstance;
  }

  public addNestedFieldChild(key: string, initialValues: any) {
    if (this.registeredNestedFieldsComponents[key]) {
      this.registeredNestedFieldsComponents[key].addChild(initialValues);
    } else {
      throw new Error(`Can't add child for unknown nested key ${key}. Known keys are ${Object.keys(this.registeredNestedFieldsComponents).join(",")}`);
    }
  }

  public seedFormState(name: string) {
    this.setValue(name, this.getSeedValue(name));
  }

  public getCurrentValue(name: string) {
    return _.get(this.state.formState, name);
  }

  public getSeedValue(name: string) {
    return _.get(this.props.seedData, name);
  }

  public submit = () => this.props.onSubmit(this.state.formState as any);

  public render() {
    const idKey = `${this.props.rootFieldName}.id`;
    return <Form loading={this.props.loading} success={this.props.success} onSubmit={this.submit}>
      {this.props.children(this, this.props.seedData)}
      {!_.isUndefined(this.getSeedValue(idKey)) && <this.SendQueryField name={idKey} />}
    </Form>;
  }

  public resourceName() {
    return _.startCase(this.props.rootFieldName);
  }

  public resourceID() {
    return ((this.props.seedData as any)[this.props.rootFieldName] as any).id;
  }
}
