import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './index.scss';

import { Home } from './home';

@observer
export class App extends React.Component<{}, {}> {
	public render() {
		return (
			<>
				<Navbar expand="lg">
					<Navbar.Brand href="#home">Jess' Portfolio</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto" />
						<Nav>
							<Nav.Link href="">About</Nav.Link>
							<Nav.Link href="">Projects</Nav.Link>
							<Button variant="outline-primary">Contact</Button>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Switch key="content">
					<Route exact path="/" component={Home} />
				</Switch>
			</>
		);
	}
}
