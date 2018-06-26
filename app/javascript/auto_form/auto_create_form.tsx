import * as React from "react";
import * as _ from "lodash";
import { Redirect } from "react-router-dom";
import { Mutation, MutationFn, MutationResult } from "react-apollo";
import { DocumentNode } from "graphql";
import { AutoFormStateContainer, IInputMutationVariables } from "./auto_form_state_container";
import { QueryInspector } from "./query_inspector";

export interface IAutoCreateFormProps<SeedData extends object, MutationData, MutationVariables extends IInputMutationVariables> {
  mutation: {
    mutation: DocumentNode;
    new(props: any, context?: any): Mutation<MutationData, MutationVariables>;
  };
  seedData?: SeedData;
  children: (form: AutoFormStateContainer<SeedData, MutationVariables>, data: SeedData) => React.ReactNode;
  redirectRoute: (result: MutationData) => string;
}

export class AutoCreateForm<SeedData extends object, MutationData, MutationVariables extends IInputMutationVariables>
  extends React.Component<IAutoCreateFormProps<SeedData, MutationData, MutationVariables>, {}> {

  private queryInspector: QueryInspector;

  public constructor(props: IAutoCreateFormProps<SeedData, MutationData, MutationVariables>) {
    super(props);
    this.queryInspector = new QueryInspector(this.props.mutation.mutation);
  }

  public render() {
    return React.createElement(this.props.mutation, {
      mutation: this.props.mutation.mutation,
      children: (mutateFunction: MutationFn<MutationData, MutationVariables>, mutationResult: MutationResult<MutationData>) => {
        const submit = (mutationVariables: MutationVariables) => {
          mutateFunction({variables: this.prepareMutationVariables(mutationVariables)});
        };

        const success = mutationResult.called && !!mutationResult.data;
        if (success && mutationResult.data) {
          return <Redirect to={this.props.redirectRoute(mutationResult.data)} />;
        } else {
          return <AutoFormStateContainer
            loading={mutationResult.loading}
            success={success}
            rootFieldName={this.queryInspector.mutationRootFieldName()}
            seedData={this.props.seedData || {}}
            onSubmit={submit}
            children={this.props.children}
          />;
        }
      },
    });
  }

  private prepareMutationVariables(variables: any): MutationVariables {
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
    const key = this.queryInspector.mutationRootFieldName();
    const rootObject = _.cloneDeep(variables[key]);
    // The seedData that got set as the formState to start has some fields in it that the mutation doesn't define, like __type.
    // Gotta get rid of those before sending off the variables.
    return { input: rootObject } as MutationVariables;
  }
}
