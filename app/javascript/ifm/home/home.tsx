import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { GetFarm } from "../types";
import { Header, Segment } from "semantic-ui-react";

export class GetFarmQuery extends Query<GetFarm.Query, GetFarm.Variables> {
  public static query = gql`
    query getFarm {
      farm {
        name
        dashboardHost
        farmZones {
          name
        }
      }
    }
  `;
}

export class Home extends React.Component<{}, {}> {
  public render() {
    return <GetFarmQuery query={GetFarmQuery.query}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        if (data && data.farm) {
          const zones = data.farm.farmZones.map((zone) => {
            return <Segment padded key={zone.name}>
              <Header small>{zone.name}</Header>
              ...
            </Segment>;
          });

          return <React.Fragment>
            <Header>{data.farm.name} Home</Header>
            <Segment padded>
              <a href={data.farm.dashboardHost}>Dashboards</a>
            </Segment>
            {zones}
          </React.Fragment>;
        }
      }}
    </GetFarmQuery>;
  }
}
