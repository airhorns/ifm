import * as React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Segment, Header } from "semantic-ui-react";
import { AutoCreateForm } from "../../auto_form";
import { CreateSchedule } from "../types";

export class CreateScheduleMutation extends Mutation<CreateSchedule.Mutation, CreateSchedule.Variables> {
  public static mutation = gql`
    mutation createSchedule($input: UpdateScheduleInput!) {
      updateSchedule(input: $input) {
        schedule {
          id
        }
      }
    }
  `;
}

export class SchedulesNew extends React.Component<{}, {}> {
  public render() {
    return <AutoCreateForm mutation={CreateScheduleMutation} redirectRoute={(data) => `/schedules/${(data.updateSchedule as any).schedule.id}/edit`}>{(form) => {
      return <React.Fragment>
        <Header>Create Schedule</Header>
        <Segment.Group>
          <Segment padded>
            <form.Input required label="Schedule name" name="schedule.name" />
            <form.Checkbox required name="schedule.enabled" label="Enabled" />
          </Segment>
          <Segment clearing>
            <form.AutoSubmit>Create Schedule</form.AutoSubmit>
          </Segment>
        </Segment.Group>
      </React.Fragment>;
    }}
  </AutoCreateForm>;
  }
}
