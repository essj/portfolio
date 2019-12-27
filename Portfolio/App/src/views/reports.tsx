import * as React from 'react';
import * as moment from 'moment-timezone';
import { bind } from 'bind-decorator';

import grey from '@material-ui/core/colors/grey';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { styled } from '@material-ui/core/styles';

const ReportCard = styled(Card)({
	background: grey[200],
	borderRadius: 10,
});

import {
	IPingDto,
	lazyInject,
	PingService,
	Service,
} from '../services';
import ThingLoader from '../components/thingLoader';

import './reports.scss';
import Checkbox from '@material-ui/core/Checkbox';

interface State {
	isNewZealandTimeZoneChecked: boolean;
}

class Reports extends React.Component<{}, State> {
	@lazyInject(Service.Ping) private _pingService!: PingService;

	constructor(props: {}) {
		super(props);

		this.state = {
			isNewZealandTimeZoneChecked: false,
		}
	}

	@bind
	private async load() {
		return await this._pingService.list();
	}

	/**
	 * See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
	 */
	private getTimeInTimeZone(time: moment.Moment) {
		const format = "L LTS ZZ";
		if (this.state.isNewZealandTimeZoneChecked) {
			return time.tz("Pacific/Auckland").format(format);
		}

		return time.tz("America/Los_Angeles").format(format);
	}

	private renderPings(pings: IPingDto[]) {
		return (
			<ReportCard elevation={0}>
				<CardContent>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>{`Time (${this.state.isNewZealandTimeZoneChecked ? "NZT" : "NST"})`}</TableCell>
									<TableCell align="right">User Name</TableCell>
									<TableCell align="right">IP Address</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{pings.map(x => (
									<TableRow key={x.pingId}>
										<TableCell>{this.getTimeInTimeZone(moment(x.timestamp))}</TableCell>
										<TableCell>{x.userName}</TableCell>
										<TableCell>{x.ipAddress}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</ReportCard>
		);
	}

	public render() {
		return (
			<ThingLoader
				load={this.load}
				loadingMessage="Loading Message Templates"
				errorLoadingMessage="Unable to retrieve Message Templates"
				render={(pings: IPingDto[]) => (
					<Paper elevation={0}>
						<Typography variant="h3" gutterBottom>
							Pings
						</Typography>
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.isNewZealandTimeZoneChecked}
									onChange={() => this.setState({ isNewZealandTimeZoneChecked: !this.state.isNewZealandTimeZoneChecked })}
									color="default"
								/>
							}
							label="NZT"
						/>
						{this.renderPings(pings)}
					</Paper>
				)
			} />
		);
	}
}

export default Reports;
