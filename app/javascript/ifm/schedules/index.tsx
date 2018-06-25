import * as React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Header, Item, Segment, Button, Divider } from "semantic-ui-react";
import { GetSchedules } from "../types";

export class GetSchedulesQuery extends Query<GetSchedules.Query, GetSchedules.Variables> {
  public static query = gql`
    query getSchedules {
      schedules {
        id
        name
        enabled
        scheduledControlStates {
          id
          desiredState
          deviceControllerConfiguration {
            nickname
          }
          recurrence {
            every
          }
        }
      }
    }
  `;
}

export class SchedulesIndex extends React.Component<{}, {}> {
  public render() {
    return <React.Fragment>
      <Header floated="left" as="h1">
        Schedules
      </Header>
      <Link to="/schedules/new"><Button primary floated="right">Add new Schedule</Button></Link>
      <Divider hidden clearing />

      <GetSchedulesQuery query={GetSchedulesQuery.query}>
      {({ loading, error, data }) => {
        if (loading) { return "Loading..."; }
        if (error) { return `Error! ${error.message}`; }
        let schedules;
        if (data && data.schedules) {
          schedules = data.schedules.map((schedule) => {
            return <Segment key={schedule.id}>
              <Header><Link to={`/schedules/${schedule.id}/edit`}>{schedule.name}</Link></Header>
            </Segment>;
          });
        }

        if (!schedules || schedules.length === 0) {
          schedules = <Item>
            <Item.Content>
              <Item.Header>No schedules configured.</Item.Header>
            </Item.Content>
          </Item>;
        }

        return schedules;
      }}
    </GetSchedulesQuery>
  </React.Fragment>;
  }
}
