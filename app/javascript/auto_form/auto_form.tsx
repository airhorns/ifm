import * as React from "react";
import * as _ from "lodash";
import { Query, QueryResult, Mutation, MutationFn, MutationResult } from "react-apollo";
import { DocumentNode } from "graphql";
import { Segment, Dimmer, Loader, Message } from "semantic-ui-react";
import { AutoFormStateContainer, IInputMutationVariables } from "./auto_form_state_container";
import { QueryInspector } from "./query_inspector";

export interface IAutoFormProps<QueryData extends object, QueryVariables, MutationData, MutationVariables extends IInputMutationVariables> {
  query: {
    query: DocumentNode;
    new(props: any, context?: any): Query<QueryData, QueryVariables>;
  };
  mutation: {
    mutation: DocumentNode;
    new(props: any, context?: any): Mutation<MutationData, MutationVariables>;
  };
  variables?: QueryVariables;
  children: (
    form: AutoFormStateContainer<QueryData, MutationVariables, MutationData>,
    data: QueryData,
    mutationData?: MutationData,
  ) => React.ReactNode;
  mutationRootName?: string,
}

export interface IAutoFormState {
  reloading: boolean;
}

export class AutoForm<QueryData extends object, QueryVariables, MutationData, MutationVariables extends IInputMutationVariables>
  extends React.Component<IAutoFormProps<QueryData, QueryVariables, MutationData, MutationVariables>, IAutoFormState> {

  private queryInspector: QueryInspector;

  public constructor(props: IAutoFormProps<QueryData, QueryVariables, MutationData, MutationVariables>) {
    super(props);

    this.state = { reloading: false };
    this.queryInspector = new QueryInspector(this.props.query.query);
  }

  // Function called by the <Query> node with the current state of the system
  public queryRenderProp = (queryResult: QueryResult<QueryData, QueryVariables>) => {
    if (queryResult.loading) {
      return <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>;
    }

    if (queryResult.error || !queryResult.data) {
      return <Segment>
        <Message negative>
          <Message.Header>There was an error communicating with the server.</Message.Header>
          <p>This page could not be loaded. Please refresh to try again.</p>
        </Message>
      </Segment>;
    }

    return React.createElement(this.props.mutation, {
      mutation: this.props.mutation.mutation,
      variables: this.props.variables,
      refetchQueries: () => [{query: this.props.query.query, variables: this.props.variables}],
      children: (mutateFunction: MutationFn<MutationData, MutationVariables>, mutationResult: MutationResult<MutationData>) => {
        const onSubmit = (mutationVariables: MutationVariables) => {
          mutateFunction({variables: this.prepareMutationVariables(mutationVariables)});
        };

        if (typeof queryResult.data === "undefined") {
          throw new Error("Unexpected undefined result from the query data");
        }

        return <AutoFormStateContainer
          key={JSON.stringify(queryResult.data)}
          loading={queryResult.loading || mutationResult.loading}
          success={mutationResult.called && !!mutationResult.data}
          seedData={queryResult.data}
          mutationData={mutationResult.data}
          rootFieldName={this.queryInspector.queryRootFieldName()}
          onSubmit={onSubmit}
          children={this.props.children}
        />;
      },
    });
  }

  public render() {
    // Capitalize variable for JSX transpilation to be able to render this variable
    return React.createElement(this.props.query, {
      query: this.props.query.query,
      variables: this.props.variables,
      children: this.queryRenderProp,
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
    const key = this.props.mutationRootName || this.queryInspector.queryRootFieldName();
    const rootObject = _.cloneDeep(variables[key]);
    // The seedData that got set as the formState to start has some fields in it that the mutation doesn't define, like __type.
    // Gotta get rid of those before sending off the variables.
    return { input: rootObject } as MutationVariables;
  }
}
