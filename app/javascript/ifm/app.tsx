import * as React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AppContainer } from "./app_container/app_container";
import { DeviceDiscoveryList } from "./device_discovery/list";
import { Home } from "./home/home";

const metaCsrf = document.querySelector("meta[name=csrf-token]");
const csrfToken = metaCsrf && metaCsrf.getAttribute("content") || null;

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(                                                        // tslint:disable-line
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) { console.log(`[Network error]: ${networkError}`); }  // tslint:disable-line
    }),
    new HttpLink({
      uri: "/graphql",
      credentials: "same-origin",
      headers: {
          "X-CSRF-Token": csrfToken
      }
    }),
  ]),
  cache: new InMemoryCache(),
});

export class App extends React.Component<{}, {}> {
  public render() {
    return <ApolloProvider client={client}>
        <AppContainer>
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/device_discovery" exact component={DeviceDiscoveryList} />
            </Switch>
          </Router>
        </AppContainer>
    </ApolloProvider>;
  }
}
