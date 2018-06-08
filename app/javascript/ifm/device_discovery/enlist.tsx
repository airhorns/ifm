import * as React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Header, Segment, Item, Button, List, Icon, Form, Dropdown } from "semantic-ui-react";
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
        proposedConfiguration {
          publishers {
            humanName
            comprehensionHumanName
            comprehensionUnit
            icon
          }
          controllers {
            humanName
            controlStrategyHumanName
            icon
          }
        }
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

          const publisherItems = data.deviceDiscoveryLog.proposedConfiguration.publishers.map((publisher) => {
            return <List.Item>
              <List.Icon name={publisher.icon as any} size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{publisher.humanName}</List.Header>
                <List.Description>interpreted as {publisher.comprehensionHumanName} {publisher.comprehensionUnit && ` in ${publisher.comprehensionUnit}`}</List.Description>
              </List.Content>
            </List.Item>;
          });

          const controllerItems = data.deviceDiscoveryLog.proposedConfiguration.controllers.map((controller) => {
            return <List.Item>
              <List.Content floated="right">
                <Form.Input label={`${controller.humanName} Nickname`}/>
              </List.Content>
              <List.Icon name={controller.icon as any} size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{controller.humanName}</List.Header>
                <List.Description>
                  controlled via {controller.controlStrategyHumanName}
                </List.Description>
              </List.Content>
            </List.Item>;
          });

          return <React.Fragment>
            <Header as="h1">Enlisting:</Header>
            <Segment padded><Item.Group><DeviceDiscoveryCard log={data.deviceDiscoveryLog}/></Item.Group></Segment>
            <Form>
              <Segment.Group>
                <Segment padded>
                  <Header size="small">This device will publish these values to the system:</Header>
                  <List divided relaxed>{publisherItems}</List>
                </Segment>
                <Segment padded>
                  <Header size="small">This device will allow control of the following:</Header>
                  <List divided relaxed>{controllerItems}</List>
                </Segment>
                <Segment padded>
                  <Form.Input required label="Device Nickname" />
                  <Form.Field>
                    <label>Device Zone</label>
                    <Dropdown selection placeholder="Zone" options={zones} />
                  </Form.Field>
                  <Form.Button type="submit">Enlist</Form.Button>
                </Segment>
              </Segment.Group>
            </Form>
          </React.Fragment>;
        }
      }}
    </EnlistQuery>
  </React.Fragment>;
  }
}
