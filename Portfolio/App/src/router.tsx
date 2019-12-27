import * as React from 'react';
import WebFont from 'webfontloader';
import { hot } from 'react-hot-loader';
import {
	Redirect,
	Route,
	Router as ReactRouter,
	Switch,
} from 'react-router';

import './services/inversify';
import './reactions';

import App from './app';
import {
	Container,
	HistoryService,
	Service,
} from './services';

WebFont.load({
	google: {
		families: ['Lato', 'Volkhov', 'sans-serif'],
	},
});

const history = Container.get<HistoryService>(Service.History);

class Router extends React.PureComponent {
	public render() {
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
