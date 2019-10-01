import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';

import './index.scss';

import { Home } from './home';

@observer
export class App extends React.Component<{}, {}> {
	public render() {
		return (
			<>
				<Switch key="content">
					<Route exact path="/" component={Home} />
				</Switch>
			</>
		);
	}
}
