import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './index.scss';

import Home from './home';

const theme = createMuiTheme({
	palette: {
		primary: amber,
	},
	props: {
		MuiButtonBase: {
			disableRipple: true,
		},
	},
});

@observer
class App extends React.PureComponent {
	public render() {
		return (
			<ThemeProvider theme={theme}>
				{/* <AppBar position="static" className="navbar">
					<Toolbar>
						<Typography variant="h6">
							Jess' Portfolio
						</Typography>
						<Button>About</Button>
						<Button>Projects</Button>
						<Button>Art</Button>
						<Button>Contact</Button>
					</Toolbar>
				</AppBar> */}
				<Switch key="content">
					<Route exact path="/" component={Home} />
				</Switch>
			</ThemeProvider>
		);
	}
}

export default App;
