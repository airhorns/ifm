import * as React from "react";
import { Label, Icon } from "semantic-ui-react";
import { DateTime } from "../types";
import { LastSeenLabel } from "./last_seen_label";

interface IDeviceConfigurationLabelsProps {
  deviceConfiguration: {
    deviceName: string,
    lastSeen: DateTime,
    dataAddress: string,
  };
}

export class DeviceConfigurationLabels extends React.Component<IDeviceConfigurationLabelsProps, {}> {
  public render() {
    return <React.Fragment>
      <Label color="green">
        <Icon name="microchip" /> {this.props.deviceConfiguration.deviceName}
      </Label>
      <LastSeenLabel date={this.props.deviceConfiguration.lastSeen}/>
      <Label color="purple">
        <Icon name="bullseye" /> {this.props.deviceConfiguration.dataAddress}
      </Label>
    </React.Fragment>;
  }
}
