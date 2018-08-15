import * as React from "react";
import * as _ from "lodash";
import gql from "graphql-tag";
import { AutoForm } from "../../auto_form";
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
  mutation sendEnlist($input: EnlistDeviceInput!) {
    enlistDevice(input: $input) {
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

export class DeviceDiscoveryEnlist extends React.Component<IDeviceDiscoveryEnlistProps, {}> {

  public render() {
    return <AutoForm query={EnlistQuery} mutation={EnlistMutation} variables={{id: this.props.id}}>
      {(form, data) => {
        if (form.success) {
          return <Redirect to={`/devices/${data.enlistDevice.deviceConfiguration.id}/edit`} />;
        }

        const zoneOptions = data.farmZones.map((zone) => ({ text: zone.name, value: zone.id }));

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
          <Segment padded>
            <Item.Group><DeviceDiscoveryCard log={data.deviceDiscoveryLog}/></Item.Group>
          </Segment>
          <Segment.Group>
            {result.data && result.data.enlistDevice && result.data.enlistDevice.errors && <Segment>
              {result.data.enlistDevice.errors.map((e) => <p>{e}</p>)}
            </Segment>}
            <DeviceDiscoveryIOSegments
               deviceConfiguration={data.deviceDiscoveryLog.proposedConfiguration}
               contentForControllerList={(controller) => {
                 return <List.Content floated="right">
                   <form.Input required name={controller.field} label={`${controller.humanName} Nickname`} />
                 </List.Content>;
               }}
             />
            <Segment padded>
              <form.Input required label="Device Nickname" name="deviceNickname"/>
              <form.Field required>
                <label>Device Zone</label>
                <Dropdown selection placeholder="Zone" options={zoneOptions} name="farmZoneId" />
              </form.Field>
              <form.AutoSubmit>Enlist</form.AutoSubmit>
            </Segment>
          </Segment.Group>
        </React.Fragment>
      }}
    </AutoForm>;
  }
}
