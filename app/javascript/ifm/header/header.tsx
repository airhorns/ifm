import * as React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Icon,
  Menu,
  Segment,
  Dropdown
} from "semantic-ui-react";

export class Header extends React.Component<{}, {}> {
  public render() {

    return <Segment
        inverted
        textAlign="center"
        style={{ padding: "0.25em 0em" }}
        vertical
      >
        <Menu inverted pointing size="large">
          <Container>
            <Menu.Item>
              <Link to="/">
                <Icon name="home" />
                Home
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/devices">Devices</Link>
            </Menu.Item>
            <Menu.Menu position="right">
              <Dropdown item text="Admin">
                <Dropdown.Menu >
                  <Dropdown.Header>Admin</Dropdown.Header>
                  <Dropdown.Item><a href="/sidekiq">Sidekiq</a></Dropdown.Item>
                  <Dropdown.Item><a href="/graphiql">GraphIQL</a></Dropdown.Item>
                  <Dropdown.Item><a href="/admin">Admin Editor</a></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>;
  }
}
