import * as React from "react";
import * as _ from "lodash";
import omitDeep from "omit-deep-lodash";
import { DocumentNode, OperationDefinitionNode, FieldNode } from "graphql";

import { MutationResult } from "react-apollo";
import { Form, Input, InputProps, Dropdown, DropdownProps, FormFieldProps, FormInputProps, Message } from "semantic-ui-react";
import { AutoInputFactory, AutoFormInput, TrustedFormInputType } from "./form_components";
import { AutoFormNestedFields, NestedFieldsFactory } from "./nested_fields";
import { AutoSubmit, AutoSubmitFactory } from "./auto_submit";

// All mutations that AutoForm works with have a root key of input that points to the fields of the object.
export interface IInputMutationVariables {
  input: object;
}

// Form state is seeded with the data that comes back from the query, and then written to with the data that will get
// sent out for the mutation. We use one object to represent this because it's actual state and will change as inputs
// change. The object sent as the mutation variables is usually not wrapped in a root level field. If we're fetching a
// field named `farm`, we're going to mutate back the fields of `farm`, not those fields wrapped in a field named `farm`.
// This state exposes the query data on top of this one-key-deep mutation variable set.
export type IFormState<QueryData extends object, MutationVariables extends IInputMutationVariables> = {
  [K in keyof QueryData]: QueryData[K] | Partial<MutationVariables>
};

export interface IAutoFormStateContainerProps<QueryData extends object, MutationVariables extends IInputMutationVariables> {
  queryDocument: DocumentNode;
  queryData: QueryData;
  loading: boolean;
  success: boolean;
  mutationResult: MutationResult<MutationVariables>;
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
  public Dropdown: AutoFormInput<DropdownProps>;
  public AutoSubmit: AutoSubmit;
  public Message = Message;

  public NestedFields: AutoFormNestedFields<QueryData>;

  constructor(props: IAutoFormStateContainerProps<QueryData, MutationVariables>) {
    super(props);
    this.state = {
      formState: this.props.queryData,
    };
    this.Input = AutoInputFactory(this, Form.Input);
    this.RawInput = AutoInputFactory(this, Input);
    this.Field = AutoInputFactory(this, (Form.Field as TrustedFormInputType));
    this.Dropdown = AutoInputFactory(this, Dropdown);
    this.NestedFields = NestedFieldsFactory(this);
    this.AutoSubmit = AutoSubmitFactory(this);
  }

  public componentWillReceiveProps(props: IAutoFormStateContainerProps<QueryData, MutationVariables>) {
    this.setState({formState: props.queryData});
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => this.setValue(event.currentTarget.name, event.currentTarget.value);

  public setValue(key: string, value: any) {
    const formState = _.cloneDeep(this.state.formState);
    _.set(formState || {}, key, value);
    this.setState({formState});
  }

  public addNestedFieldChild(key: string, initialValues: any) {
    const index = (this.getValue(key) || []).length;
    this.setValue(`${key}[${index}]`, initialValues);
  }

  public getValue(name: string) {
    return _.get(this.state.formState, name);
  }

  public submit = () => this.props.submit(this.prepareMutationVariables());

  public render() {
    return <Form loading={this.props.loading} success={this.props.success} onSubmit={this.submit}>
      {this.props.children(this, this.props.queryData)}
    </Form>;
  }

  public inputRootFieldName() {
    const definitions = _.filter(
      this.props.queryDocument.definitions,
      (definition): definition is OperationDefinitionNode => definition.kind === "OperationDefinition",
    );

    if (definitions.length === 0) { throw new Error("couldn't get input root name, no definitions in gql document"); }
    if (definitions[0].selectionSet.selections.length === 0) { throw new Error("couldn't get input root name, no selected fields in gql document");  }

    const fields = _.filter(
      definitions[0].selectionSet.selections,
      (selection): selection is FieldNode => selection.kind === "Field",
    );
    if (fields.length === 0) { throw new Error("couldn't get input root name, no fields in selection in gql document");  }
    return fields[0].name.value;
  }

  private prepareMutationVariables(): MutationVariables {
    const key = this.inputRootFieldName();
    const variables = _.cloneDeep((this.state.formState as any)[key]);
    // The queryData that got set as the formState to start has some fields in it that the mutation doesn't define, like __type.
    // Gotta get rid of those before sending off the variables.
    return {
      input: omitDeep(variables, ["__typename"]),
    } as MutationVariables;
  }
}
