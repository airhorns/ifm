import * as React from "react";
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
            <Menu.Item as="a" active>
              <Icon name="home" />
              Home
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>;
  }
}
