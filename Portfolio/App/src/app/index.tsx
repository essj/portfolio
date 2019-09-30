import * as React from "react";
import { observer } from "mobx-react";
import { Switch } from "react-router";

import "./index.scss";

@observer
export class App extends React.Component<{}, {}> {
	public render() {
		return (
			<>
				<div>Hello</div>
				<Switch />
			</>
		);
	}
}
