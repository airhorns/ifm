// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "../ifm/app";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App/>, document.body.appendChild(document.createElement("div")));
});
