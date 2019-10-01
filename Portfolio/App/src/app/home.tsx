import * as React from 'react';

import './home.scss';

export class Home extends React.PureComponent {
	public render() {
		const panda = require('../resources/images/panda.jpg');

		return <div className="home">
			<img src={panda} />
			<div className="content">
				<h1>Hello</h1>
				<div>I'm Jess, a software engineer from New Zealand.</div>
				<div>This is where I put some of my projects, art, or photos of my dog.</div>
			</div>
		</div>;
	}
}
