import "./styles";
import * as React from "react";
import { Header } from "../header/header";

export class AppContainer extends React.Component<{}, {}> {
  public render() {
    return <div className="ifm-container">
      <Header/>
      <div className="ifm-content">
        {this.props.children}
      </div>
    </div>;
  }
}
