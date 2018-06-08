import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Item, Table, Button, Icon } from "semantic-ui-react";
import { GetDeviceDiscoveryLogQuery } from "../queries";
import { DeviceDiscoveryCard } from "./device_discovery_card";

interface IDeviceDiscoveryEnlistProps {
  id: string;
}
export class DeviceDiscoveryEnlist extends React.Component<IDeviceDiscoveryEnlistProps, {}> {
  public render() {
    return <React.Fragment>
      <GetDeviceDiscoveryLogQuery query={GetDeviceDiscoveryLogQuery.query} variables={{id: this.props.id }}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        if (data && data.deviceDiscoveryLog) {
          return <React.Fragment>
            <Header as="h1">Enlisting:</Header>
            <Item.Group><DeviceDiscoveryCard log={data.deviceDiscoveryLog}/></Item.Group>
          </React.Fragment>;
        }
      }}
    </GetDeviceDiscoveryLogQuery>
  </React.Fragment>;
  }
}
