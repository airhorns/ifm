import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Item, Table, Label, Icon } from "semantic-ui-react";
import { GetDeviceDiscoveryLogs } from "../types";

interface IDeviceDiscoveryCard {
  log: GetDeviceDiscoveryLogs.DeviceDiscoveryLogs;
  dataTable?: boolean;
}

export class DeviceDiscoveryCard extends React.Component<IDeviceDiscoveryCard, {}> {
  public render() {
    const dataRows = this.props.dataTable && Object.keys(this.props.log.data).map((key) => {
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
          <span className="lastSeen">Last seen {this.props.log.lastSeen}</span>
        </Item.Meta>
        {this.props.dataTable && <Item.Description>
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Data Stream</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{dataRows}</Table.Body>
          </Table>
        </Item.Description>}
        <Item.Extra>{this.props.children}</Item.Extra>
      </Item.Content>
    </Item>;
  }
}
