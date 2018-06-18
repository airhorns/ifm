import * as React from "react";
import { Link } from "react-router-dom";
import { Item, Label, Icon, List, Header, Segment } from "semantic-ui-react";
import { GetDeviceConfigurations, DeviceControllerState } from "../types";
import { LastSeenLabel } from "./last_seen_label";
import { DevicePublishesSegment } from "./device_publishes_segment";

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

  public colourForControllerState(state: DeviceControllerState) {
    if (state === "on") {
      return "green";
    } else {
      return "grey";
    }
  }
  public render() {
    const controllerItems = this.props.deviceConfiguration.controllers.map((controller) => {
      return <List.Item key={controller.humanName}>
        <List.Icon name={controller.icon as any} size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>
            {controller.nickname}: <Label color={this.colourForControllerState(controller.humanState)} horizontal>{controller.humanState}</Label>
          </List.Header>
          <List.Description>
            {controller.controlStrategyHumanName} control on {controller.humanName}
          </List.Description>
        </List.Content>
      </List.Item>;
    });

    return <Item>
      <Item.Image size="tiny" src={this.props.deviceConfiguration.imageUrl} />

      <Item.Content>
        <Item.Header>
          <Link to={`/devices/${this.props.deviceConfiguration.id}/edit`}>{this.props.deviceConfiguration.humanName}</Link>
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
            <DevicePublishesSegment vertical deviceConfiguration={this.props.deviceConfiguration} />
          </React.Fragment>}
          {!this.state.showDetails && <a onClick={(_) => this.toggleDetails(true)}><Icon name="plus"/> Show details</a>}
          <Segment padded vertical>
            {controllerItems.length > 0 && <Header size="small">Controls:</Header>}
            {controllerItems.length > 0 && <List divided relaxed>{controllerItems}</List>}
          </Segment>
        </Item.Description>
      </Item.Content>
    </Item>;
  }
}
