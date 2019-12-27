import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import {
	lazyInject,
	PingService,
	Service,
} from '../services';

interface Props extends RouteComponentProps<{
	userName: string,
	source: string,
}> { }

class Ping extends React.PureComponent<Props> {
	@lazyInject(Service.Ping) private _pingService!: PingService;

	public async componentDidMount() {
		const userName = this.props.match.params.userName;
		const source = this.props.match.params.source;

		this._pingService.ping(userName, source);
	}

	public render() {
		return (
			null
		);
	}
}

export default Ping;
