import * as React from "react";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { Header, Segment, Item, List, Form, Dropdown } from "semantic-ui-react";
import { GetEnlist, SendEnlist } from "../types";
import { DeviceDiscoveryCard } from "./device_discovery_card";
import { DeviceIOSegments } from "../devices/device_io_segments";

class EnlistQuery extends Query<GetEnlist.Query, GetEnlist.Variables> {
  public static query = gql`
    query getEnlist($id: ID!) {
      deviceDiscoveryLog(id: $id) {
        id
        imageUrl
        dataAddress
        deviceName
        lastSeen
        proposedConfiguration {
          publishers {
            humanName
            comprehensionHumanName
            comprehensionUnit
            icon
          }
          controllers {
            humanName
            controlStrategyHumanName
            icon
          }
        }
        enlistedConfiguration {
          id
          humanName
          deviceName
        }
      }
      farmZones {
        id
        name
      }
    }
  `;
}

class EnlistMutation extends Mutation<SendEnlist.EnlistDevice, SendEnlist.Variables> {
  public static mutation = gql`
  mutation sendEnlist($deviceDiscoveryLogId: ID!, $deviceNickname: String!, $farmZoneId: ID!) {
    enlistDevice(deviceDiscoveryLogId: $deviceDiscoveryLogId, deviceNickname: $deviceNickname, farmZoneId: $farmZoneId) {
      deviceConfiguration {
        id
      }
      errors
    }
  }

  `;
}

interface IDeviceDiscoveryEnlistProps {
  id: string;
}

interface IDeviceDiscoveryEnlistState {
  deviceNickname?: string;
  farmZoneId?: string;
}

export class DeviceDiscoveryEnlist extends React.Component<IDeviceDiscoveryEnlistProps, IDeviceDiscoveryEnlistState> {
  public handleChange = (_: any, data: {name: string, value: string}) => {
    const {name, value} = data;
    this.setState({[name]: value} as IDeviceDiscoveryEnlistState);
  }

  public render() {
    return <EnlistQuery query={EnlistQuery.query} variables={{id: this.props.id }}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        if (data && data.deviceDiscoveryLog && data.farmZones) {
          const deviceDiscoveryLog = data.deviceDiscoveryLog;
          const zones = data.farmZones.map((zone) => ({ text: zone.name, value: zone.id }));

          return <React.Fragment>
            <Header as="h1">Enlisting:</Header>
            <Segment padded><Item.Group><DeviceDiscoveryCard log={deviceDiscoveryLog}/></Item.Group></Segment>
            <EnlistMutation mutation={EnlistMutation.mutation}>{
              (enlist, result) => {
                if (result.data && result.data.deviceConfiguration) {
                  return <Redirect to={`/devices/${result.data.deviceConfiguration.id}`} />;
                }
                return <Form loading={result.loading} onSubmit={(e) => {
                  e.preventDefault();
                  const variables = Object.assign({}, this.state, {deviceDiscoveryLogId: this.props.id}) as SendEnlist.Variables;
                  enlist({variables});
                }}>
                  <Segment.Group>
                    <DeviceIOSegments
                       deviceConfiguration={deviceDiscoveryLog.proposedConfiguration}
                       contentForControllerList={(controller) => {
                         return <List.Content floated="right">
                           <Form.Input required label={`${controller.humanName} Nickname`}/>
                         </List.Content>;
                       }}
                     />
                    <Segment padded>
                      <Form.Input required label="Device Nickname" name="deviceNickname" onChange={this.handleChange}/>
                      <Form.Field required>
                        <label>Device Zone</label>
                        <Dropdown selection placeholder="Zone" options={zones} name="farmZoneId" onChange={this.handleChange} />
                      </Form.Field>
                      <Form.Button type="submit">Enlist</Form.Button>
                    </Segment>
                  </Segment.Group>
                </Form>;
              }
            }
            </EnlistMutation>
          </React.Fragment>;
        }
      }}
    </EnlistQuery>;
  }
}
