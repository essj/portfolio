import * as React from "react";
import { Route, Switch, Redirect } from 'react-router';
import { observer } from 'mobx-react';

import './index.scss';

@observer
export class App extends React.Component<{}, {}> {
	render() {
		return (
			<>
				<div>Hello</div>
				<Switch>
					<Route component={() => <Redirect to="/" />} />
				</Switch>
			</>
		);
	}
}
