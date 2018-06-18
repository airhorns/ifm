import "./styles";
import * as React from "react";
import { Container } from "semantic-ui-react";
import { Header } from "../header/header";

export class AppContainer extends React.Component<{}, {}> {
  public render() {
    return <div className="ifm-container">
      <Header/>
      <Container style={{ marginTop: "1em" }}>
      {this.props.children}
      </Container>
    </div>;
  }
}
