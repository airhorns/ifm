import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Item, Segment } from "semantic-ui-react";
import { GetDeviceConfiguration } from "../types";
import { DeviceCard } from "./device_card";

export class GetDeviceConfigurationQuery extends Query<GetDeviceConfiguration.Query, GetDeviceConfiguration.Variables> {
  public static query = gql`
    query getDeviceConfiguration($id: ID!) {
      deviceConfiguration(id: $id) {
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
  `;
}

interface IDevicesShowProps {
  id: string;
}

export class DevicesShow extends React.Component<IDevicesShowProps, {}> {
  public render() {
    return <GetDeviceConfigurationQuery query={GetDeviceConfigurationQuery.query} variables={{id: this.props.id }}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        if (data && data.deviceConfiguration) {
          return <Segment padded>
            <Item.Group><DeviceCard deviceConfiguration={data.deviceConfiguration}/></Item.Group>
          </Segment>;
        }
      }}
    </GetDeviceConfigurationQuery>;
  }
}
