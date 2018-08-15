import * as React from "react";
import { Header, Segment, List } from "semantic-ui-react";
import { Json } from "../types";

interface IDeviceController {
  humanName: string;
  field: string;
  controlStrategyHumanName: string;
  icon: string;
}

interface IDevicePublisher {
  humanName: string;
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
  contentForControllerList?: (controller: IDeviceController, index?: number) => JSX.Element;
  contentForPublisherList?: (publisher: IDevicePublisher, index?: number) => JSX.Element;
}

export class DeviceDiscoveryIOSegments extends React.Component<IDeviceIoSegmentsProps, {}> {
  public render() {
    const publisherItems = this.props.deviceConfiguration.publishers.map((publisher, index) => {
      return <List.Item key={publisher.humanName}>
        { this.props.contentForPublisherList && this.props.contentForPublisherList(publisher, index) }
        <List.Icon name={publisher.icon as any} size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>{publisher.humanName}</List.Header>
          <List.Description>interpreted as {publisher.comprehensionHumanName} {publisher.comprehensionUnit && ` in ${publisher.comprehensionUnit}`}</List.Description>
        </List.Content>
      </List.Item>;
    });

    const controllerItems = this.props.deviceConfiguration.controllers.map((controller, index) => {
      return <List.Item key={controller.humanName}>
        { this.props.contentForControllerList && this.props.contentForControllerList(controller, index) }
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
        <Segment padded>
          <Header size="small">This device will publish these values to the system:</Header>
          <List divided relaxed>{publisherItems}</List>
        </Segment>
        <Segment padded>
          {controllerItems.length === 0 && <Header size="small">This device has no controls.</Header>}
          {controllerItems.length > 0 && <Header size="small">This device will allow control of the following:</Header>}
          {controllerItems.length > 0 && <List divided relaxed>{controllerItems}</List>}
        </Segment>
    </React.Fragment>;
    }
}
