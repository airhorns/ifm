import * as React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Header, Item, Table, Button, Icon } from "semantic-ui-react";
import { GetDeviceDiscoveryLogs } from "../types";
import { DeviceDiscoveryCard } from "./device_discovery_card";

export class GetDeviceDiscoveryLogsQuery extends Query<GetDeviceDiscoveryLogs.Query, GetDeviceDiscoveryLogs.Variables> {
  public static query = gql`
    query getDeviceDiscoveryLogs {
      deviceDiscoveryLogs {
        id
        imageUrl
        dataAddress
        deviceName
        lastSeen
        data
        enlistedConfiguration {
          id
          humanName
          deviceName
        }
      }
    }
  `;
}

interface IDeviceDiscoveryIndexState {
  filter: string
}

export class DeviceDiscoveryIndex extends React.Component<{}, IDeviceDiscoveryIndexState> {
  public render() {
    return <React.Fragment>
      <Header as="h1">Discovered Devices</Header>
      <GetDeviceDiscoveryLogsQuery query={GetDeviceDiscoveryLogsQuery.query}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        let items;
        if (data && data.deviceDiscoveryLogs) {
          items = data.deviceDiscoveryLogs.map((log) => {
            return <DeviceDiscoveryCard log={log} dataTable key={log.dataAddress}>
            <Link to={`/device_discovery/${log.id}/enlist`}>
              <Button primary floated="right">
                Enlist
                <Icon name="chevron right" />
              </Button>
              <Button secondary floated="right">
                Dismiss
              </Button>
            </Link>
          </DeviceDiscoveryCard>;
          });
        }

        if (!items || items.length === 0) {
          items = <Item>
            <Item.Content>
              <Item.Header>No new devices discovered</Item.Header>
            </Item.Content>
          </Item>;
        }

        return <Item.Group divided>{items}</Item.Group>;
      }}
    </GetDeviceDiscoveryLogsQuery>
  </React.Fragment>;
  }
}
