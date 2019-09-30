import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from "./router";

import "./variables.scss";

ReactDOM.render(
	<Router />,
	document.getElementById("app") as HTMLElement,
);
