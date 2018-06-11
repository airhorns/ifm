import * as React from "react";
import * as _ from "lodash";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { Header, Segment, Item, List, Form, Dropdown } from "semantic-ui-react";
import { GetEnlist, SendEnlist, EnlistControl } from "../types";
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
            field
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
  mutation sendEnlist($deviceDiscoveryLogId: ID!, $deviceNickname: String!, $farmZoneId: ID!, $enlistControls: [EnlistControl!]!) {
    enlistDevice(
      deviceDiscoveryLogId: $deviceDiscoveryLogId,
      deviceNickname: $deviceNickname,
      farmZoneId: $farmZoneId,
      enlistControls: $enlistControls
    ) {
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
  deviceDiscoveryLogId?: string;
  deviceNickname?: string;
  farmZoneId?: string;
  enlistControls?: EnlistControl[];
}

export class DeviceDiscoveryEnlist extends React.Component<IDeviceDiscoveryEnlistProps, IDeviceDiscoveryEnlistState> {
  public constructor(props: IDeviceDiscoveryEnlistProps) {
    super(props);
    this.state = {enlistControls: [], deviceDiscoveryLogId: this.props.id};
  }

  public handleChange = (__: any, input: {name: string, value: string}) => {
    const {name, value} = input;
    this.setState({[name]: value});
  }

  public handleControlChange = (__: any, input: {name: string, value: string}) => {
    const {name, value} = input;
    this.setState((previousState, ___) => {
      let controls = previousState.enlistControls;
      const existingControl = _.find(controls, (control: EnlistControl) => control.field === name);

      if (existingControl) {
        existingControl.controlNickname = value;
      } else {
        controls = [{field: name, controlNickname: value, enabled: true}];
      }

      return {...previousState, enlistControls: controls};
    });
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
                  const variables = this.state as SendEnlist.Variables;
                  enlist({variables});
                }}>
                  <Segment.Group>
                    <DeviceIOSegments
                       deviceConfiguration={deviceDiscoveryLog.proposedConfiguration}
                       contentForControllerList={(controller) => {
                         return <List.Content floated="right">
                           <Form.Input required name={controller.field} label={`${controller.humanName} Nickname`} onchange={this.handleControlChange}/>
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
