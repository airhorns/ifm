import * as React from "react";
import * as _ from "lodash";
import gql from "graphql-tag";
import { Link, Redirect } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { Header, Segment, Item, List, Form, Dropdown } from "semantic-ui-react";
import { GetEnlist, SendEnlist, EnlistControlInput } from "../types";
import { DeviceDiscoveryCard } from "./device_discovery_card";
import { DeviceDiscoveryIOSegments } from "./device_discovery_io_segments";

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
          humanNameWithZone
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

class EnlistMutation extends Mutation<SendEnlist.Mutation, SendEnlist.Variables> {
  public static mutation = gql`
  mutation sendEnlist($deviceDiscoveryLogId: ID!, $deviceNickname: String!, $farmZoneId: ID!, $enlistControls: [EnlistControlInput!]!) {
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
  enlistControls?: EnlistControlInput[];
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
      const existingControl = _.find(controls, (control: EnlistControlInput) => control.field === name);

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

          if (data.deviceDiscoveryLog.enlistedConfiguration) {
            return <Segment>
              <Header as="h1">This {data.deviceDiscoveryLog.enlistedConfiguration.deviceName} is already enlisted.</Header>
              <p>View this device: <Link to={`/devices/${data.deviceDiscoveryLog.enlistedConfiguration.id}/edit`}>
                  {data.deviceDiscoveryLog.enlistedConfiguration.humanNameWithZone}
                </Link>
              </p>
            </Segment>;
          }

          return <React.Fragment>
            <Header as="h1">Enlisting:</Header>
            <Segment padded><Item.Group><DeviceDiscoveryCard log={deviceDiscoveryLog}/></Item.Group></Segment>
            <EnlistMutation mutation={EnlistMutation.mutation}>{
              (enlist, result) => {
                if (result.data && result.data.enlistDevice && result.data.enlistDevice.deviceConfiguration) {
                  return <Redirect to={`/devices/${result.data.enlistDevice.deviceConfiguration.id}/edit`} />;
                }

                return <Form loading={result.loading} onSubmit={(e) => {
                  e.preventDefault();
                  const variables = this.state as SendEnlist.Variables;
                  enlist({variables});
                }}>
                  <Segment.Group>
                    {result.data && result.data.enlistDevice && result.data.enlistDevice.errors && <Segment>
                      {result.data.enlistDevice.errors.map((e) => <p>{e}</p>)}
                    </Segment>}
                    <DeviceDiscoveryIOSegments
                       deviceConfiguration={deviceDiscoveryLog.proposedConfiguration}
                       contentForControllerList={(controller) => {
                         return <List.Content floated="right">
                           <Form.Input required name={controller.field} label={`${controller.humanName} Nickname`} onChange={this.handleControlChange}/>
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
