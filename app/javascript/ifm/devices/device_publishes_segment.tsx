import * as React from "react";
import { Header, Segment, List } from "semantic-ui-react";
import { Json } from "../types";

interface IDevicePublisher {
  humanName: string;
  humanValue: string;
  comprehensionHumanName: string;
  comprehensionUnit?: string | null;
  icon: string;
}

interface IDevicePublishesSegmentProps {
  deviceConfiguration: {
    config?: Json;
    publishers: IDevicePublisher[];
  };
  vertical?: boolean;
  padded?: boolean;
}

export class DevicePublishesSegment extends React.Component<IDevicePublishesSegmentProps, {}> {
  public static defaultProps: Partial<IDevicePublishesSegmentProps> = {
    padded: true,
  };

  public render() {
    const publisherItems = this.props.deviceConfiguration.publishers.map((publisher) => {
      return <List.Item key={publisher.humanName}>
        <List.Icon name={publisher.icon as any} size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>{publisher.humanName}: {publisher.humanValue} {publisher.comprehensionUnit && publisher.comprehensionUnit}</List.Header>
        </List.Content>
      </List.Item>;
    });

    return <Segment padded={this.props.padded} vertical={this.props.vertical}>
        <Header size="small">Publishes:</Header>
        <List divided relaxed>{publisherItems}</List>
      </Segment>;
    }
}
