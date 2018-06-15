import * as React from "react";
import { Query, QueryResult, Mutation, MutationFn, MutationResult } from "react-apollo";
import { DocumentNode } from "graphql";
import { Segment, Dimmer, Loader, Message } from "semantic-ui-react";
import { AutoFormStateContainer } from "./auto_form_state_container";

export interface IAutoFormProps<QueryData, QueryVariables, MutationData, MutationVariables> {
  query: {
    query: DocumentNode;
    new(props: any, context?: any): Query<QueryData, QueryVariables>;
  };
  mutation: {
    mutation: DocumentNode;
    new(props: any, context?: any): Mutation<MutationData, MutationVariables>;
  };
  variables?: QueryVariables;
  children: (form: AutoFormStateContainer<QueryData, QueryVariables, MutationVariables>, data?: QueryData) => React.ReactNode;
}

export class AutoForm<QueryData, QueryVariables, MutationData, MutationVariables>
  extends React.Component<IAutoFormProps<QueryData, QueryVariables, MutationData, MutationVariables>, {}> {

  // Function called by the <Query> node with the current state of the system
  public queryRenderProp = (queryResult: QueryResult<QueryData, QueryVariables>) => {
    const {loading, data, error} = queryResult;

    if (loading) {
      return <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>;
    }

    if (error || !data) {
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
          mutateFunction(mutationVariables);
        };

        return <AutoFormStateContainer queryResult={queryResult} mutationResult={result} submit={submit} children={this.props.children} />;
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
