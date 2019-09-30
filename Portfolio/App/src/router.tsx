import * as React from "react";
import WebFont from "webfontloader";
import { App } from "./app";
import { Container, HistoryService, Services } from "./services";
import { hot } from "react-hot-loader";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Redirect, Route, Router as ReactRouter, Switch } from "react-router";

import "./reactions";
import "./services/inversify";

WebFont.load({
	google: {
		families: ["Roboto", "sans-serif"],
	},
});

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#f1c40f",
		},
	},
});

const history = Container.get<HistoryService>(Services.History);

class Router extends React.Component<{}, {}> {
	public render() {
		return <MuiThemeProvider theme={theme}>
			<ReactRouter history={history.history}>
				<Switch>
					<Route path="/" component={App} />
					<Route component={() => <Redirect to="/" />} />
				</Switch>

			</ReactRouter>
		</MuiThemeProvider>;
	}
}

export default hot(module)(Router);
