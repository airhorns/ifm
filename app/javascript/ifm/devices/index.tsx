import * as React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Header, Item, Segment, Button, Divider } from "semantic-ui-react";
import { GetDeviceConfigurations } from "../types";
import { DeviceCard } from "./device_card";

export class GetDeviceConfigurationsQuery extends Query<GetDeviceConfigurations.Query, GetDeviceConfigurations.Variables> {
  public static query = gql`
    query getDeviceConfigurations {
      farmZones {
        name
        id
        deviceConfigurations {
          id
          imageUrl
          humanName
          deviceName
          lastSeen
          publishers {
            humanName
            humanValue
            comprehensionHumanName
            comprehensionUnit
            icon
          }
          controllers {
            field
            nickname
            humanName
            humanState
            controlStrategyHumanName
            icon
          }
          farmZone {
            name
          }
        }
      }
    }
  `;
}

export class DevicesIndex extends React.Component<{}, {}> {
  public render() {
    return <React.Fragment>
      <Header floated="left" as="h1">
        Devices
      </Header>
      <Link to="/device_discovery"><Button primary floated="right">Add new from discoveries</Button></Link>
      <Divider hidden clearing />

      <GetDeviceConfigurationsQuery query={GetDeviceConfigurationsQuery.query}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        let zones;
        if (data && data.farmZones) {
          zones = data.farmZones.map((zone) => {
            let devices = zone.deviceConfigurations.map((deviceConfiguration) => {
              return <DeviceCard deviceConfiguration={deviceConfiguration} key={deviceConfiguration.id} />;
            });

            if (devices.length === 0) {
              devices = [<Item key="empty">
                <Item.Content>No devices yet.</Item.Content>
              </Item>];
            }

            return <Segment key={zone.id}>
              <Header>{zone.name}</Header>
              <Item.Group divided>{devices}</Item.Group>
            </Segment>;
          });
        }

        if (!zones || zones.length === 0) {
          zones = <Item>
            <Item.Content>
              <Item.Header>No farm zones configured.</Item.Header>
            </Item.Content>
          </Item>;
        }

        return zones;
      }}
    </GetDeviceConfigurationsQuery>
  </React.Fragment>;
  }
}
