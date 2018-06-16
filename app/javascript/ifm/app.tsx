import * as React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AppContainer } from "./app_container/app_container";
import { DevicesIndex } from "./devices/index";
import { DevicesEdit } from "./devices/edit";
import { DeviceDiscoveryIndex } from "./device_discovery/index";
import { DeviceDiscoveryEnlist } from "./device_discovery/enlist";
import { FarmSettings } from "./settings/farm";
import { Home } from "./home/home";
import { NoMatch } from "./no_match";

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
          "X-CSRF-Token": csrfToken,
      },
    }),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

export class App extends React.Component<{}, {}> {
  public render() {
    return <ApolloProvider client={client}>
      <Router>
        <AppContainer>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/devices" exact component={DevicesIndex} />
              <Route path="/devices/:id/edit" render={({match}) => <DevicesEdit id={match.params.id}/>}/>
              <Route path="/device_discovery" exact component={DeviceDiscoveryIndex} />
              <Route path="/device_discovery/:id/enlist" render={({match}) => <DeviceDiscoveryEnlist id={match.params.id}/>}/>
              <Route path="/settings/farm" exact component={FarmSettings} />
              <Route component={NoMatch} />
            </Switch>
        </AppContainer>
      </Router>
    </ApolloProvider>;
  }
}
