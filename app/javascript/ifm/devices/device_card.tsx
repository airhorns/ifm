import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Item, Table, Label, Icon } from "semantic-ui-react";
import { GetDeviceConfigurations } from "../types";

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
          <span className="lastSeen">Last seen {this.props.deviceConfiguration.lastSeen}</span>
        </Item.Meta>
      </Item.Content>
    </Item>;
  }
}
