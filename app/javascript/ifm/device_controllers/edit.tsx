import * as React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { Item, Icon, Button, Segment, Header, Message } from "semantic-ui-react";
import { AutoQuery } from "../auto_query";
import { GetDeviceControllerConfiguration, UpdateDeviceControllerState } from "../types";
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

class UpdateDeviceControllerStateMutation extends Mutation<UpdateDeviceControllerState.Mutation, UpdateDeviceControllerState.Variables> {
  public static mutation = gql`
    mutation updateDeviceControllerState($input: UpdateDeviceControllerStateInput!) {
      updateDeviceControllerState(input: $input) {
        deviceController {
          humanState
        }
      }
    }
  `;
}

interface IDeviceControllersEditProps {
  id: string;
}

export class DeviceControllersEdit extends React.Component<IDeviceControllersEditProps, {}> {
  public updateDeviceControllerState(mutateFn: any, newState: string) {
    mutateFn({variables: {input: {id: this.props.id, state: newState}}});
  }

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
                    <Icon name={data.deviceControllerConfiguration.controller.icon as any} size="large"/>
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
                    <UpdateDeviceControllerStateMutation
                      mutation={UpdateDeviceControllerStateMutation.mutation}>{(mutate, {loading, error, data: mutationData}) => {
                        return <React.Fragment>
                            {error && <Message negative>
                              <Message.Header>Error updating controller</Message.Header>
                              <p>Error: {"" + error}</p>
                            </Message>}
                            <Button.Group size="mini">
                            <Button disabled={loading} onClick={() => this.updateDeviceControllerState(mutate, "off")}>Turn Off</Button>
                            <Button.Or text="/"/>
                            <Button positive disabled={loading} onClick={() => this.updateDeviceControllerState(mutate, "on")}>Turn On</Button>
                          </Button.Group>
                          {loading && <Icon name="circle notched" loading />}
                          {mutationData && <Icon name="checkmark" color="green"/>}
                        </React.Fragment>;
                      }}
                    </UpdateDeviceControllerStateMutation>
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
