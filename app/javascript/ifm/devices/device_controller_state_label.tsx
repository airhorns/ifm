import * as React from "react";
import { DeviceControllerState } from "../types";
import { Label } from "semantic-ui-react";

export interface IDeviceControllerStateLabelProps {
  controller: {
    humanState: DeviceControllerState,
  };
}

export class DeviceControllerStateLabel extends React.Component<IDeviceControllerStateLabelProps, {}> {
  public colourForControllerState(state: DeviceControllerState) {
    if (state === "on") {
      return "green";
    } else {
      return "grey";
    }
  }

  public render() {
    return <Label color={this.colourForControllerState(this.props.controller.humanState)} horizontal>{this.props.controller.humanState}</Label>;
  }
}
