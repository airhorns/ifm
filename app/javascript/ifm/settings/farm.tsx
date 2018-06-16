import * as React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { GetFarmSettings, UpdateFarm } from "../types";
import { AutoForm } from "../../auto_form";
import { Header, Segment, Button } from "semantic-ui-react";

export class GetFarmSettingsQuery extends Query<GetFarmSettings.Query, GetFarmSettings.Variables> {
  public static query = gql`
    query getFarmSettings {
      farm {
        name
        farmZones {
          id
          name
        }
      }
    }
  `;
}

class UpdateFarmMutation extends Mutation<UpdateFarm.Mutation, UpdateFarm.Variables> {
  public static mutation = gql`
  mutation updateFarm($input: UpdateFarmInput!) {
    updateFarm(input: $input) {
      farm {
        name
        farmZones {
          id
          name
        }
      }
      errors
    }
  }`;
}

export class FarmSettings extends React.Component<{}, {}> {
  public render() {
    return <AutoForm query={GetFarmSettingsQuery} mutation={UpdateFarmMutation}>
      {(form) => {
        return <React.Fragment>
          <Header>Edit Farm</Header>
          <Segment.Group>
            <Segment>
              <Header size="small">Farm Details</Header>
              <form.Input required label="Farm name" name="farm.name" control="input"/>
            </Segment>
            <Segment>
              <Header size="small">Farm Zones</Header>
              <form.NestedFields name="farm.farmZones">{(_, zone, index) => {
                return <form.Input required label="Farm zone name" name={`farm.farmZones[${index}].name`} control="input" key={zone.name}/>;
              }}</form.NestedFields>
              <form.NestedFields name="farm.createFarmZones">{(_, __, index) => {
                return <form.Input required label="New farm zone name" name={`farm.createFarmZones[${index}].name`} control="input" key={index}/>;
              }}</form.NestedFields>
              <Button onClick={(e) => { e.preventDefault(); form.addNestedFieldChild("farm.createFarmZones", {}); }}>Add a zone</Button>
            </Segment>
            <Segment clearing>
              <form.AutoSubmit>Update Farm</form.AutoSubmit>
            </Segment>
          </Segment.Group>
        </React.Fragment>;
      }}
    </AutoForm>;
  }
}
