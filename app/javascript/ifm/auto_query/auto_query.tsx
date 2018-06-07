import * as React from "react";
import * as graphql from "graphql-tag";
import { Query } from "react-apollo";

export class AutoQuery<Data, Variables> extends Query<Data, Variables> {
  public render() {
    return <Query query={this.props.query}>
    {({ loading, error, data }) => {
      if (loading) { return "Loading..."; }
      if (error) { return `Error! ${error.message}`; }

      return this.props.children(data);
    }}
  </Query>;
  }
}
