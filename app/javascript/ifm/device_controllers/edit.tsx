import * as React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Item, Icon, Button, Segment, Header } from "semantic-ui-react";
import { AutoQuery } from "../auto_query";
import { GetDeviceControllerConfiguration } from "../types";
import { DeviceControllerStateLabel } from "./device_controller_state_label";

class GetDeviceControllerConfigurationQuery extends Query<GetDeviceControllerConfiguration.Query, GetDeviceControllerConfiguration.Variables> {
  public static query = gql`
    query getDeviceControllerConfiguration($id: ID!) {
      deviceControllerConfiguration(id: $id) {
        field
        nickname
        enabled
        controller {
          humanName
          humanState
          controlStrategyHumanName
          icon
        }
        deviceConfiguration {
          id
          humanName
        }
      }
    }
  `;
}

interface IDeviceControllersEditProps {
  id: string;
}

export class DeviceControllersEdit extends React.Component<IDeviceControllersEditProps, {}> {
  public render() {
    return <AutoQuery query={GetDeviceControllerConfigurationQuery} variables={{id: this.props.id}}>{(data) => {
      return <React.Fragment>
        <Header>Edit Device Controller</Header>
        <Segment.Group>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>
                    <Icon name={data.deviceControllerConfiguration.controller.icon as any} size="large" verticalAlign="middle"/>
                    {data.deviceControllerConfiguration.controller.humanName} on&nbsp;
                    <Link to={`/devices/${data.deviceControllerConfiguration.deviceConfiguration.id}/edit`}>
                      {data.deviceControllerConfiguration.deviceConfiguration.humanName}
                    </Link>
                  </Item.Header>
                  <Item.Meta>
                    <div>
                      controlled via {data.deviceControllerConfiguration.controller.controlStrategyHumanName},&nbsp;
                      currently: <DeviceControllerStateLabel controller={data.deviceControllerConfiguration.controller} />
                    </div>
                    <Button.Group size="mini">
                      <Button>Turn Off</Button>
                      <Button.Or text="/"/>
                      <Button positive>Turn On</Button>
                    </Button.Group>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment.Group>
      </React.Fragment>;
    }}</AutoQuery>;
  }
}
