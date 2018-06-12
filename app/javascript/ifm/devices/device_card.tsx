import * as React from "react";
import { Link } from "react-router-dom";
import { Item, Label, Icon } from "semantic-ui-react";
import { GetDeviceConfigurations } from "../types";
import { LastSeenLabel } from "./last_seen_label";
import { DeviceIOSegments } from "./device_io_segments";

interface IDeviceCardProps {
  deviceConfiguration: GetDeviceConfigurations.DeviceConfigurations;
}

interface IDeviceCardState {
  showDetails: boolean;
}

export class DeviceCard extends React.Component<IDeviceCardProps, IDeviceCardState> {
  public constructor(props: IDeviceCardProps) {
    super(props);
    this.state = {showDetails: false};
  }

  public toggleDetails(showDetails: boolean) {
    this.setState({showDetails});
  }

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
        <Item.Description>
          {this.state.showDetails && <React.Fragment>
            <a onClick={(_) => this.toggleDetails(false)}><Icon name="minus"/> Hide details</a>
            <DeviceIOSegments deviceConfiguration={this.props.deviceConfiguration} />
          </React.Fragment>}
          {!this.state.showDetails && <a onClick={(_) => this.toggleDetails(true)}><Icon name="plus"/> Show details</a>}        </Item.Description>
      </Item.Content>
    </Item>;
  }
}
