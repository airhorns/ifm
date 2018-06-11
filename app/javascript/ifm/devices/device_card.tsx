import * as React from "react";
import { Link } from "react-router-dom";
import { Item, Label, Icon } from "semantic-ui-react";
import { GetDeviceConfigurations } from "../types";
import { LastSeenLabel } from "./last_seen_label";

interface IDeviceCard {
  deviceConfiguration: GetDeviceConfigurations.DeviceConfigurations;
  dataTable?: boolean;
}

export class DeviceCard extends React.Component<IDeviceCard, {}> {
  public render() {
    return <Item>
      <Item.Image size="tiny" src={this.props.deviceConfiguration.imageUrl} />

      <Item.Content>
        <Item.Header>
          <Link to={`/devices/${this.props.deviceConfiguration.id}`}>{this.props.deviceConfiguration.humanName}</Link>
        </Item.Header>
        <Item.Meta>
          <Label color="green">
            <Icon name="microchip" /> {this.props.deviceConfiguration.deviceName}
          </Label>
          <LastSeenLabel date={this.props.deviceConfiguration.lastSeen}/>
        </Item.Meta>
      </Item.Content>
    </Item>;
  }
}
