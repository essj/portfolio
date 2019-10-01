import * as React from 'react';

import './home.scss';

export class Home extends React.PureComponent {
	public render() {
		const panda = require('../resources/images/panda.jpg');

		return <div>
			<img src={panda} />
		</div>;
	}
}
