import * as React from "react";
import { Header, Segment, List } from "semantic-ui-react";
import { Json } from "../types";

interface IDeviceController {
  nickname: string;
  humanName: string;
  humanState: string;
  field: string;
  controlStrategyHumanName: string;
  icon: string;
}

interface IDevicePublisher {
  humanName: string;
  humanValue: string;
  comprehensionHumanName: string;
  comprehensionUnit?: string | null;
  icon: string;
}

interface IDeviceIoSegmentsProps {
  deviceConfiguration: {
    config?: Json;
    controllers: IDeviceController[];
    publishers: IDevicePublisher[];
  };
}

export class DeviceIOSegments extends React.Component<IDeviceIoSegmentsProps, {}> {
  public render() {
    const publisherItems = this.props.deviceConfiguration.publishers.map((publisher) => {
      return <List.Item key={publisher.humanName}>
        <List.Icon name={publisher.icon as any} size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>{publisher.humanName}: {publisher.humanValue} {publisher.comprehensionUnit && publisher.comprehensionUnit}</List.Header>
        </List.Content>
      </List.Item>;
    });

    const controllerItems = this.props.deviceConfiguration.controllers.map((controller) => {
      return <List.Item key={controller.humanName}>
        <List.Icon name={controller.icon as any} size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>{controller.nickname}: {controller.humanState}</List.Header>
          <List.Description>
            {controller.controlStrategyHumanName} control on {controller.humanName}
          </List.Description>
        </List.Content>
      </List.Item>;
    });

    return <React.Fragment>
        <Segment padded vertical>
          <Header size="small">Publishes:</Header>
          <List divided relaxed>{publisherItems}</List>
        </Segment>
        <Segment padded vertical>
          {controllerItems.length === 0 && <Header size="small">This device has no controls.</Header>}
          {controllerItems.length > 0 && <Header size="small">Controls:</Header>}
          {controllerItems.length > 0 && <List divided relaxed>{controllerItems}</List>}
        </Segment>
    </React.Fragment>;
    }
}
