import * as React from "react";
import * as _ from "lodash";
import { QueryResult, MutationResult } from "react-apollo";
import { Form, Input, InputProps, Dropdown, DropdownProps, FormFieldProps, FormInputProps } from "semantic-ui-react";
import { autoInputFactory, AutoFormInput, TrustedFormInputType } from "./form_components";
import { AutoFormNestedFields, NestedFieldsFactory } from "./nested_fields";

export interface IAutoFormStateContainerProps<QueryData, QueryVariables, MutationVariables> {
  queryResult: QueryResult<QueryData, QueryVariables>;
  mutationResult: MutationResult<MutationVariables>;
  submit: (variables: MutationVariables) => void;
  children: (form: AutoFormStateContainer<QueryData, QueryVariables, MutationVariables>, data?: QueryData) => React.ReactNode;
}

export interface IAutoFormStateContainerState<QueryData, MutationVariables> {
  formState?: Partial<MutationVariables> & QueryData;
}

export class AutoFormStateContainer<QueryData, QueryVariables, MutationVariables> extends
    React.Component<IAutoFormStateContainerProps<QueryData, QueryVariables, MutationVariables>,
                    IAutoFormStateContainerState<QueryData, MutationVariables>> {

  public Input: AutoFormInput<FormInputProps>;
  public RawInput: AutoFormInput<InputProps>;
  public Field: AutoFormInput<FormFieldProps>;
  public Dropdown: AutoFormInput<DropdownProps>;

  public NestedFields: AutoFormNestedFields<QueryData>;

  constructor(props: IAutoFormStateContainerProps<QueryData, QueryVariables, MutationVariables>) {
    super(props);
    this.state = {
      formState: this.props.queryResult.data,
    };
    this.Input = autoInputFactory(this, Form.Input);
    this.RawInput = autoInputFactory(this, Input);
    this.Field = autoInputFactory(this, (Form.Field as TrustedFormInputType));
    this.Dropdown = autoInputFactory(this, Dropdown);
    this.NestedFields = NestedFieldsFactory(this);
  }

  public componentWillReceiveProps(props: IAutoFormStateContainerProps<QueryData, QueryVariables, MutationVariables>) {
    this.setState({formState: props.queryResult.data});
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

  public trySubmit() {
    if (this.state.formState) {
      this.props.submit(this.state.formState as any as MutationVariables);
    }
  }

  public render() {
    return <Form loading={this.props.queryResult.loading || this.props.mutationResult.loading} onSubmit={(__) => this.trySubmit()}>
      {this.props.children(this, this.state.formState)}
    </Form>;
  }
}
