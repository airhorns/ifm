import * as React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Item, Segment, Header, List } from "semantic-ui-react";
import { AutoForm } from "../../auto_form";
import { GetDeviceConfiguration, UpdateDeviceConfiguration } from "../types";
import { DevicePublishesSegment } from "./device_publishes_segment";
import { LastSeenLabel } from "./last_seen_label";

export class GetDeviceConfigurationQuery extends Query<GetDeviceConfiguration.Query, GetDeviceConfiguration.Variables> {
  public static query = gql`
    query getDeviceConfiguration($id: ID!) {
      deviceConfiguration(id: $id) {
        id
        imageUrl
        humanName
        deviceName
        lastSeen
        publishers {
          humanName
          humanValue
          comprehensionHumanName
          comprehensionUnit
          icon
        }
        deviceControllerConfigurations {
          id
          field
          nickname
          controller {
            humanName
            humanState
            controlStrategyHumanName
            icon
          }
        }
        farmZone {
          name
        }
      }
    }
  `;
}

export class UpdateDeviceConfigurationMutation extends Mutation<UpdateDeviceConfiguration.Mutation, UpdateDeviceConfiguration.Variables> {
  public static mutation = gql`
    mutation updateDeviceConfiguration($input: UpdateDeviceConfigurationInput!) {
      updateDeviceConfiguration(input: $input) {
        deviceConfiguration {
          id
          imageUrl
          humanName
          deviceName
          lastSeen
          publishers {
            humanName
            humanValue
            comprehensionHumanName
            comprehensionUnit
            icon
          }
          deviceControllerConfigurations {
            id
            field
            nickname
            controller {
              humanName
              humanState
              controlStrategyHumanName
              icon
            }
          }
          farmZone {
            name
          }
        }
      }
    }
  `;
}

interface IDevicesEditProps {
  id: string;
}

export class DevicesEdit extends React.Component<IDevicesEditProps, {}> {
  public render() {
    return <AutoForm query={GetDeviceConfigurationQuery} mutation={UpdateDeviceConfigurationMutation} variables={{id: this.props.id}}>{(form, data) => {
      return <React.Fragment>
        <Header>Edit Device</Header>
        <form.Message success>Device {data.deviceConfiguration.humanName} updated successfully!</form.Message>
        <Segment.Group>
          <Segment padded>
            <Item.Group>
              <Item>
                <Item.Image size="tiny" src={data.deviceConfiguration.imageUrl} />
                <Item.Content>
                  <Item.Header>Device: {data.deviceConfiguration.deviceName}</Item.Header>
                  <Item.Meta>
                    <LastSeenLabel date={data.deviceConfiguration.lastSeen}/>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment padded>
            <form.Input required label="Device nickname" name="deviceConfiguration.humanName" control="input"/>
            <Header size="tiny">Device controls</Header>
            <List divided relaxed>
              <form.NestedFields name="deviceConfiguration.deviceControllerConfigurations">{(_, controllerConfig, index) => {
                return <List.Item key={controllerConfig.controller.humanName}>
                  <List.Icon name={controllerConfig.controller.icon as any} size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>{controllerConfig.controller.humanName}</List.Header>
                    <List.Description>
                      controlled via {controllerConfig.controller.controlStrategyHumanName}
                    </List.Description>
                    <form.Group>
                      <form.SendQueryField name={`deviceConfiguration.deviceControllerConfigurations[${index}].field`} />
                      <form.Input
                        required
                        name={`deviceConfiguration.deviceControllerConfigurations[${index}].nickname`}
                        label={`${controllerConfig.controller.humanName} Nickname`}
                      />
                      <form.Checkbox
                        required
                        name={`deviceConfiguration.deviceControllerConfigurations[${index}].enabled`}
                        label="Enabled"
                      />
                    </form.Group>
                  </List.Content>
                </List.Item>;
              }}</form.NestedFields>
            </List>
          </Segment>
          <DevicePublishesSegment deviceConfiguration={data.deviceConfiguration}/>
          <Segment clearing>
            <form.AutoSubmit>Update Device</form.AutoSubmit>
          </Segment>
        </Segment.Group>
      </React.Fragment>;
    }}
  </AutoForm>;
  }
}
