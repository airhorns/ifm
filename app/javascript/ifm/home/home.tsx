import * as React from "react";
import * as _ from "lodash";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Header, Segment, List } from "semantic-ui-react";
import { GetFarm } from "../types";
import { DeviceControllerStateLabel } from "../device_controllers/device_controller_state_label";

export class GetFarmQuery extends Query<GetFarm.Query, GetFarm.Variables> {
  public static query = gql`
    query getFarm {
      farm {
        name
        dashboardHost
        farmZones {
          name
          deviceConfigurations {
            humanName
            deviceControllerConfigurations {
              id
              nickname
              controller {
                icon
                humanState
              }
            }
          }
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
            const deviceItems = _.flatMap(zone.deviceConfigurations, (deviceConfiguration) => {
              return deviceConfiguration.deviceControllerConfigurations.map((deviceControllerConfiguration) => {
                return <List.Item>
                  <List.Icon name={deviceControllerConfiguration.controller.icon as any} size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>
                      {deviceConfiguration.humanName} - {deviceControllerConfiguration.nickname} :&nbsp;
                      <DeviceControllerStateLabel controller={deviceControllerConfiguration.controller}/>
                    </List.Header>
                    <List.Description>
                      <Link to={`/device_controllers/${deviceControllerConfiguration.id}/edit`}>Manage</Link>
                    </List.Description>
                  </List.Content>
                </List.Item>;
              });
            });

            if (deviceItems.length === 0) {
              deviceItems.push(<List.Item>
                <List.Content><List.Description>No devices yet in zone</List.Description></List.Content>
              </List.Item>);
            }

            return <Segment padded key={zone.name}>
              <Header small>{zone.name}</Header>
              <List divided relaxed>{deviceItems}</List>
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
