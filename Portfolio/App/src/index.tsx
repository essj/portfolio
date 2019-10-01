import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Router from './router';

import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<Router />,
	document.getElementById('app') as HTMLElement,
);
