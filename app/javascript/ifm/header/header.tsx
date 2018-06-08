import * as React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

export class Header extends React.Component<{}, {}> {
  public render() {
    const fixed = false;

    return <Segment
        inverted
        textAlign="center"
        style={{ padding: "0.25em 0em" }}
        vertical
      >
        <Menu
          fixed={fixed ? "top" : undefined}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item as="div" header>
              <Link to="/">
                <Icon name="home" />
                Home
              </Link>
            </Menu.Item>
            <Menu.Item as="div">
              <Link to="/device_discovery">Devices</Link>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>;
  }
}
