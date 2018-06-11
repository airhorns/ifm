import * as React from "react";
import { Link } from "react-router-dom";
import { Item, Table, Label, Icon } from "semantic-ui-react";
import { GetDeviceDiscoveryLogs } from "../types";
import { LastSeenLabel } from "../devices/last_seen_label";

interface IDeviceDiscoveryCardProps {
  log: GetDeviceDiscoveryLogs.DeviceDiscoveryLogs;
}

interface IDeviceDiscoveryCardState {
  dataTable: boolean;
}

export class DeviceDiscoveryCard extends React.Component<IDeviceDiscoveryCardProps, IDeviceDiscoveryCardState> {
  public constructor(props: IDeviceDiscoveryCardProps) {
    super(props);
    this.state = {dataTable: false};
  }

  public toggleDataTable(show: boolean) {
    this.setState({dataTable: show});
  }

  public render() {
    const dataRows = this.state.dataTable && Object.keys(this.props.log.data).map((key) => {
      return <Table.Row key={key}>
        <Table.Cell>{key}</Table.Cell>
        <Table.Cell>{this.props.log.data[key]}</Table.Cell>
      </Table.Row>;
    });

    let label;
    if (this.props.log.enlistedConfiguration) {
      label = <Label color="green">
        <Icon name="external alternate" /> Enlisted as <Link to={`/devices/${this.props.log.enlistedConfiguration.id}`}>{this.props.log.enlistedConfiguration.humanName}</Link>
      </Label>;
    } else {
      label = <Label color="purple">
        <Icon name="external alternate" /> Not enlisted
      </Label>;
    }

    return <Item>
      <Item.Image size="tiny" src={this.props.log.imageUrl} />

      <Item.Content>
        <Item.Header>{this.props.log.deviceName} @ {this.props.log.dataAddress}</Item.Header>
        <Item.Meta>
          {label}
          <LastSeenLabel date={this.props.log.lastSeen}/>
        </Item.Meta>
        <Item.Description>
        {this.state.dataTable && <React.Fragment>
          <a onClick={(_) => this.toggleDataTable(false)}><Icon name="database"/> Hide raw data</a>
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Data Stream</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{dataRows}</Table.Body>
          </Table>
        </React.Fragment>}
        {!this.state.dataTable && <a onClick={(_) => this.toggleDataTable(true)}><Icon name="database"/> Show raw data</a>}
        </Item.Description>
        <Item.Extra>{this.props.children}</Item.Extra>
      </Item.Content>
    </Item>;
  }
}
