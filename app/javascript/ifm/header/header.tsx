import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Container,
  Icon,
  Menu,
  Segment,
  Dropdown,
} from "semantic-ui-react";

export class Header extends React.Component<{}, {}> {
  public render() {

    return <Segment
        inverted
        textAlign="center"
        style={{ padding: "0.25em 0em" }}
        vertical
      >
        <Menu inverted pointing secondary size="large">
          <Container>
            <Menu.Item as={Link} to="/"><Icon name="home" /> Home</Menu.Item>
            <Menu.Item as={NavLink} to="/schedules" activeClassName="active">Schedules</Menu.Item>
            <Menu.Item as={NavLink} to="/devices" activeClassName="active">Devices</Menu.Item>
            <Menu.Menu position="right">
              <Dropdown item text="Settings">
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/settings/farm" activeClassName="active">Farm Settings</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown item text="Admin">
                <Dropdown.Menu>
                  <Dropdown.Item as="a" href="/admin/tools/sidekiq">Sidekiq</Dropdown.Item>
                  <Dropdown.Item as="a" href="/admin/tools/graphiql">GraphIQL</Dropdown.Item>
                  <Dropdown.Item as="a" href="/admin/tools/rails_db">SQL Queries</Dropdown.Item>
                  <Dropdown.Item as="a" href="/admin/">Admin Editor</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>;
  }
}
