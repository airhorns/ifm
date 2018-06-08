import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Item, Table, Button, Icon } from "semantic-ui-react";
import { GetAllDeviceDiscoveryLogsQuery } from "../queries";
import { DeviceDiscoveryCard } from "./device_discovery_card";

export class DeviceDiscoveryIndex extends React.Component<{}, {}> {
  public render() {
    return <React.Fragment>
      <Header as="h1">Discovered Devices</Header>
      <GetAllDeviceDiscoveryLogsQuery query={GetAllDeviceDiscoveryLogsQuery.query}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        let items;
        if (data && data.allDeviceDiscoveryLogs) {
          items = data.allDeviceDiscoveryLogs.map((log) => {

            return <DeviceDiscoveryCard log={log} dataTable key={log.dataAddress}>
            <Link to={`/device_discovery/${log.id}/enlist`}>
              <Button primary floated="right">
                Enlist
                <Icon name="chevron right" />
              </Button>
            </Link>
          </DeviceDiscoveryCard>;
          });
        } else {
          items = <Item>
            <Item.Content>
              <Item.Header>No new devices discovered</Item.Header>
            </Item.Content>
          </Item>;
        }

        return <Item.Group>{items}</Item.Group>;
      }}
    </GetAllDeviceDiscoveryLogsQuery>
  </React.Fragment>;
  }
}
