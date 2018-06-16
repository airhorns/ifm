import * as React from "react";
import { Query, QueryResult, Mutation, MutationFn, MutationResult } from "react-apollo";
import { DocumentNode } from "graphql";
import { Segment, Dimmer, Loader, Message } from "semantic-ui-react";
import { AutoFormStateContainer, IInputMutationVariables } from "./auto_form_state_container";

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
  children: (form: AutoFormStateContainer<QueryData, MutationVariables>, data: QueryData) => React.ReactNode;
}

export interface IAutoFormState {
  reloading: boolean;
}

export class AutoForm<QueryData extends object, QueryVariables, MutationData, MutationVariables extends IInputMutationVariables>
  extends React.Component<IAutoFormProps<QueryData, QueryVariables, MutationData, MutationVariables>, IAutoFormState> {

  public constructor(props: IAutoFormProps<QueryData, QueryVariables, MutationData, MutationVariables>) {
    super(props);
    this.state = { reloading: false };
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
      children: (mutateFunction: MutationFn<MutationData, MutationVariables>, result: MutationResult<MutationVariables>) => {
        const submit = (mutationVariables: MutationVariables) => {
          mutateFunction({variables: mutationVariables});
        };

        if (typeof queryResult.data === "undefined") {
          throw new Error("Unexpected undefined queryData");
        }

        // When the mutation has come back successfully, fire the query again to refresh the form.
        if (result.called && !result.loading && !result.error) {
          queryResult.refetch(this.props.variables).then(() => this.setState({reloading: false}));
        }

        return <AutoFormStateContainer
          loading={this.state.reloading || queryResult.loading || result.loading}
          queryDocument={this.props.query.query}
          queryData={queryResult.data}
          mutationResult={result}
          submit={submit}
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
}
