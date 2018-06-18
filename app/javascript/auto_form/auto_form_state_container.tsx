import * as React from "react";
import * as _ from "lodash";
import { DocumentNode } from "graphql";
import { Form, Input, InputProps, FormSelectProps, FormCheckboxProps, FormRadioProps, FormFieldProps, FormInputProps, Message } from "semantic-ui-react";
import { QueryInspector } from "./query_inspector";
import { AutoInputFactory, AutoFormInput, TrustedFormInputType } from "./auto_input_factory";
import { AutoFormNestedFields, NestedFieldsFactory } from "./nested_fields";
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
export type IFormState<QueryData extends object, MutationVariables extends IInputMutationVariables> = {
[K in keyof QueryData]?: Partial<MutationVariables>
};

export interface IAutoFormStateContainerProps<QueryData extends object, MutationVariables extends IInputMutationVariables> {
  queryDocument: DocumentNode;
  queryData: QueryData;
  loading: boolean;
  success: boolean;
  submit: (variables: MutationVariables) => void;
  children: (form: AutoFormStateContainer<QueryData, MutationVariables>, data: QueryData) => React.ReactNode;
}

export interface IAutoFormStateContainerState<QueryData extends object, MutationVariables extends IInputMutationVariables> {
  formState: IFormState<QueryData, MutationVariables>;
}

export class AutoFormStateContainer<QueryData extends object, MutationVariables extends IInputMutationVariables> extends
    React.Component<IAutoFormStateContainerProps<QueryData, MutationVariables>,
                    IAutoFormStateContainerState<QueryData, MutationVariables>> {

  public Input: AutoFormInput<FormInputProps>;
  public RawInput: AutoFormInput<InputProps>;
  public Field: AutoFormInput<FormFieldProps>;
  public Select: AutoFormInput<FormSelectProps>;
  public Checkbox: AutoFormInput<FormCheckboxProps>;
  public Radio: AutoFormInput<FormRadioProps>;
  public SendQueryField: SendQueryField;
  public AutoSubmit: AutoSubmit;
  public Message = Message;
  public Group = Form.Group;

  public NestedFields: AutoFormNestedFields<QueryData>;

  private queryInspector: QueryInspector;
  private seedKeys: string[];

  constructor(props: IAutoFormStateContainerProps<QueryData, MutationVariables>) {
    super(props);
    this.state = { formState: {} };
    this.seedKeys = [];
    this.queryInspector = new QueryInspector(this.props.queryDocument);
    this.Input = AutoInputFactory(this, Form.Input);
    this.RawInput = AutoInputFactory(this, Input);
    this.Select = AutoInputFactory(this, Form.Select);
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

  public addNestedFieldChild(key: string, initialValues: any) {
    const index = (this.getSeedValue(key) || []).length;
    this.setValue(`${key}[${index}]`, initialValues);
  }

  public seedFormState(name: string) {
    this.seedKeys.push(name);
    this.setValue(name, this.getSeedValue(name));
  }

  public getSeedValue(name: string) {
    return _.get(this.props.queryData, name);
  }

  public submit = () => this.props.submit(this.prepareMutationVariables());

  public render() {
    return <Form loading={this.props.loading} success={this.props.success} onSubmit={this.submit}>
      {this.props.children(this, this.props.queryData)}
    </Form>;
  }

  public resourceName() {
    return _.capitalize(this.queryInspector.rootFieldName());
  }

  public resourceID() {
    return ((this.props.queryData as any)[this.queryInspector.rootFieldName()] as any).id;
  }

  private prepareMutationVariables(): MutationVariables {
    // Build an object of the shape
    // {
    //   input: {
    //     id: ...,
    //     fieldA: ...,
    //     fieldB: ...,
    //   }
    // }
    // To do this, we need to strip the leading resource key from the form state, and add in an ID
    // key if we queried for it.
    const key = this.queryInspector.rootFieldName();
    const rootObject = _.cloneDeep((this.state.formState as any)[key]);
    if (!_.isUndefined(this.resourceID())) {
      rootObject.id = this.resourceID();
    }
    // The queryData that got set as the formState to start has some fields in it that the mutation doesn't define, like __type.
    // Gotta get rid of those before sending off the variables.
    return { input: rootObject } as MutationVariables;
  }
}
