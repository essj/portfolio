import * as React from "react";
import { hot } from 'react-hot-loader';
import { Router as ReactRouter, Route, Switch, Redirect } from 'react-router';

import './services/inversify';
import './reactions';

import { Container, HistoryService, Services } from './services';

import { App } from './app';

const history = Container.get<HistoryService>(Services.History);

class Router extends React.Component<{}, {}> {
	render() {
		return (
			<ReactRouter history={history.history}>
				<Switch>
					<Route path="/" component={App} />
					<Route component={() => <Redirect to="/" />} />
				</Switch>

			</ReactRouter>
		);
	}
}

export default hot(module)(Router);