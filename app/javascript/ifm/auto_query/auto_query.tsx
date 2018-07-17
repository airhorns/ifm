import * as React from "react";
import { DocumentNode } from "graphql";
import { Query, QueryResult } from "react-apollo";

export interface IAutoQueryProps<Data, Variables> {
  query: {
    query: DocumentNode;
    new(props: any, context?: any): Query<Data, Variables>;
  };
  variables?: Variables;
  children: (data: Data) => React.ReactNode;
}

export class AutoQuery<Data, Variables> extends React.Component<IAutoQueryProps<Data, Variables>, {}> {
  public render() {
    return React.createElement(this.props.query, {
      variables: this.props.variables,
      query: this.props.query.query,
      children: ({ loading, error, data }: QueryResult) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }

        return this.props.children(data);
      },
    });
  }
}
