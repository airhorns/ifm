import * as React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Item, Button, Segment, Header } from "semantic-ui-react";
import { AutoForm } from "../../auto_form";
import { GetSchedule, UpdateSchedule } from "../types";
import { RecurrenceEditor } from "./recurrence_editor";

export class GetScheduleQuery extends Query<GetSchedule.Query, GetSchedule.Variables> {
  public static query = gql`
    query getSchedule($id: ID!) {
      schedule(id: $id) {
        id
        name
        enabled
        scheduledControlStates {
          id
          desiredState
          deviceControllerConfiguration {
            fullName
            controller {
              icon
            }
          }
          recurrence {
            every
          }
        }
      }
      deviceControllerConfigurations {
        id
        fullName
      }
    }
  `;
}

export class UpdateScheduleMutation extends Mutation<UpdateSchedule.Mutation, UpdateSchedule.Variables> {
  public static mutation = gql`
    mutation updateSchedule($input: UpdateScheduleInput!) {
      updateSchedule(input: $input) {
        schedule {
          id
        }
      }
    }
  `;
}

interface ISchedulesEditProps {
  id: string;
}

export class SchedulesEdit extends React.Component<ISchedulesEditProps, {}> {
  public render() {
    return <AutoForm query={GetScheduleQuery} mutation={UpdateScheduleMutation} variables={{id: this.props.id}}>{(form, data) => {
      return <React.Fragment>
        <Header>Edit Schedule</Header>
        <form.Message success>Schedule {data.schedule.name} updated successfully!</form.Message>
        <Segment.Group>
          <Segment padded>
            <form.Input required label="Schedule name" name="schedule.name" />
            <form.Checkbox required name="schedule.enabled" label="Enabled" />
          </Segment>
          <Segment padded>
            <Header size="tiny">Controller schedules</Header>
            <Item.Group divided relaxed>
              <form.NestedFields name="schedule.scheduledControlStates">{(_, controlState, index) => {
                return <Item key={`existing-${index}`}>
                  <Item.Content>
                    <Item.Header>Schedule on {controlState.deviceControllerConfiguration.fullName}</Item.Header>
                    <Item.Description>
                      <RecurrenceEditor form={form} rootKey={`schedule.scheduledControlStates[${index}].recurrence`} />
                    </Item.Description>
                  </Item.Content>
                </Item>;
              }}</form.NestedFields>
              <form.NestedFields name="schedule.createScheduledControlStates">{(_, __, index) => {
                return <Item key={`existing-${index}`}>
                  <Item.Content>
                    <Item.Header>New schedule</Item.Header>
                    <Item.Description>
                      <form.Dropdown
                        required
                        selection
                        placeholder="Pick a control..."
                        label="Scheduled Control"
                        name={`schedule.createScheduledControlStates[${index}].deviceControllerConfigurationId`}
                        options={data.deviceControllerConfigurations.map((config) => ({text: config.fullName, value: config.id}))}
                      />
                      <RecurrenceEditor form={form} rootKey={"schedule.createScheduledControlStates[${index}].recurrence"} />
                  </Item.Description>
                </Item.Content>
              </Item>
              }}</form.NestedFields>
            </Item.Group>
            <Button onClick={(e) => { e.preventDefault(); form.addNestedFieldChild("schedule.createScheduledControlStates", {}); }}>Add a controller</Button>
          </Segment>
          <Segment clearing>
            <form.AutoSubmit>Update Schedule</form.AutoSubmit>
          </Segment>
        </Segment.Group>
      </React.Fragment>;
    }}
  </AutoForm>;
  }
}
