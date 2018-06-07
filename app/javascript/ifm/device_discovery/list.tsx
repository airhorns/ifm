import * as React from "react";
import { Item, Table } from "semantic-ui-react";
import { GetAllDeviceDiscoveryLogsQuery } from "../queries";

export class DeviceDiscoveryList extends React.Component<{}, {}> {
  public render() {
    debugger


    return <GetAllDeviceDiscoveryLogsQuery query={GetAllDeviceDiscoveryLogsQuery.query}>
    {({ loading, error, data }) => {
      if (loading) { return "Loading..."; }
      if (error) { return `Error! ${error.message}`; }
      let items;
      if (data && data.allDeviceDiscoveryLogs) {
        items = data.allDeviceDiscoveryLogs.map((log) => {
          return <Item>
            <Item.Image size="tiny" src="/assets/images/wireframe/image.png" />

            <Item.Content>
              <Item.Header>{log.deviceClass}@{log.mqttKey}</Item.Header>
              <Item.Meta>
                <span className="lastSeen">Last seen {log.lastSeen}</span>
              </Item.Meta>
              <Item.Description>
                <Table basic="very" celled collapsing>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Data Stream</Table.HeaderCell>
                      <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>

                    <Table.Row>
                      <Table.Cell>Foobar</Table.Cell>
                      <Table.Cell>baz</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>thing</Table.Cell>
                      <Table.Cell>thang</Table.Cell>
                    </Table.Row>

                  </Table.Body>
                </Table>
              </Item.Description>
            </Item.Content>
          </Item>;
        });
      } else {
        items = <Item>
          <Item.Content>
            <Item.Header>No new devices discovered</Item.Header>
          </Item.Content>
        </Item>;
      }

      return <Item.Group>{items}</Item.Group>;
    }}
  </GetAllDeviceDiscoveryLogsQuery>;
  }
}
