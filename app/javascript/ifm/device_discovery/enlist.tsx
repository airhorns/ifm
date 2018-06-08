import * as React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Header, Item, Button, List, Icon, Form, Dropdown } from "semantic-ui-react";
import { Enlist } from "../types";
import { DeviceDiscoveryCard } from "./device_discovery_card";

interface IDeviceDiscoveryEnlistProps {
  id: string;
}

export class EnlistQuery extends Query<Enlist.Query, Enlist.Variables> {
  public static query = gql`
    query enlist($id: ID!) {
      deviceDiscoveryLog(id: $id) {
        id
        imageUrl
        dataAddress
        deviceName
        lastSeen
        data
      }
      farmZones {
        id
        name
      }
    }
  `;
}

export class DeviceDiscoveryEnlist extends React.Component<IDeviceDiscoveryEnlistProps, {}> {
  public render() {
    return <React.Fragment>
      <EnlistQuery query={EnlistQuery.query} variables={{id: this.props.id }}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        if (data && data.deviceDiscoveryLog && data.farmZones) {
          const zones = data.farmZones.map((zone) => ({ text: zone.name, value: zone.id }));

          return <React.Fragment>
            <Header as="h1">Enlisting:</Header>
            <Item.Group><DeviceDiscoveryCard log={data.deviceDiscoveryLog}/></Item.Group>

            <Form>
              <Form.Input label="Nickname" />
              <Form.Field><Dropdown selection placeholder="Zone" options={zones} /></Form.Field>
              <Form.Button type="submit">Enlist</Form.Button>
            </Form>

            <List divided relaxed>
              <List.Item></List.Item>
            </List>
          </React.Fragment>;
        }
      }}
    </EnlistQuery>
  </React.Fragment>;
  }
}
