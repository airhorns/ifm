import * as React from "react";
import { Header, Item, Table, Button, Icon } from "semantic-ui-react";
import { GetAllDeviceDiscoveryLogsQuery } from "../queries";

export class DeviceDiscoveryList extends React.Component<{}, {}> {
  public render() {
    return <React.Fragment>
      <Header as='h1'>Discovered Devices</Header>
      <GetAllDeviceDiscoveryLogsQuery query={GetAllDeviceDiscoveryLogsQuery.query}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        let items;
        if (data && data.allDeviceDiscoveryLogs) {
          items = data.allDeviceDiscoveryLogs.map((log) => {
            const dataRows = Object.keys(log.data).map((key) => {
              return <Table.Row>
                <Table.Cell key={key}>{key}</Table.Cell>
                <Table.Cell>{log.data[key]}</Table.Cell>
              </Table.Row>;
            });

            return <Item key={log.dataAddress}>
              <Item.Image size="tiny" src="/assets/images/wireframe/image.png" />

              <Item.Content>
                <Item.Header>{log.deviceName} @ {log.dataAddress}</Item.Header>
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

                    <Table.Body>{dataRows}</Table.Body>
                  </Table>
                </Item.Description>
                <Item.Extra>
                  <Button primary floated="right">
                    Enlist
                    <Icon name="chevron right" />
                  </Button>
                </Item.Extra>
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
    </GetAllDeviceDiscoveryLogsQuery>
  </React.Fragment>;
  }
}
