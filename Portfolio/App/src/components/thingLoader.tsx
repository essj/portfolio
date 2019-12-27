import * as React from 'react';
import { observer } from 'mobx-react';
import bind from 'bind-decorator';

interface WithIdPropsBase<T, O> {
	id: O;
	load: (id: O) => Promise<T | null>;
}

interface WithoutIdPropsBase<T> {
	id?: undefined;
	load: () => Promise<T>;
}

interface RenderProps<T> {
	render: (thing: T, reload: () => void) => JSX.Element;
	loadingMessage?: string | null;
	errorLoadingMessage?: string | React.ReactElement<any>;
	errorLoadingDescription?: string | React.ReactElement<any>;
	errorLoadingVisual?: React.ReactElement<any>;
}

type WithIdProps<T, O> = WithIdPropsBase<T, O> & RenderProps<T>;
type WithoutIdProps<T> = WithoutIdPropsBase<T> & RenderProps<T>;

export type ThingLoaderProps<T, O> = WithIdProps<T, O> | WithoutIdProps<T>;

interface State<T, O> {
	isLoading: boolean;
	thingId?: O | null;
	thing?: T | null;
}

function isIdLoader<T, O>(item: ThingLoaderProps<T, O>): item is WithIdProps<T, O> {
	return (item as WithIdPropsBase<T, O>).id !== undefined;
}

/**
 * Shallow compares two objects, checking if their property values are equal.
 * Objects with object properties will always be not equal.
 */
function shallowCompareIsEqual(obj1: any, obj2: any) {
	if (obj1 === obj2) {
		return true;
	}

	return Object.keys(obj1).length === Object.keys(obj2).length
		&& Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
}

@observer
class ThingLoader<T, O = any> extends React.Component<ThingLoaderProps<T, O>, State<T, O>> {
	constructor(props: any) {
		super(props);

		this.state = {
			thingId: props.id,
			isLoading: true,
		};
	}

	public async componentDidMount() {
		await this.loadThing(this.state.thingId);
	}

	public async componentWillReceiveProps(nextProps: ThingLoaderProps<T, O>) {
		if (!shallowCompareIsEqual(nextProps.id, this.state.thingId)) {
			this.setState({
				isLoading: true,
				thingId: nextProps.id,
				thing: null,
			});

			await this.loadThing(nextProps.id);
		}
	}

	private async loadThing(thingId?: O | null) {
		let thing: T | null = null;
		try {
			if (isIdLoader(this.props) && thingId) {
				thing = await this.props.load(thingId);
			} else {
				thing = await (this.props as WithoutIdProps<T>).load();
			}
		} catch (err) {
			// TODO.
		}

		this.setState({
			isLoading: false,
			thing,
		});
	}

	@bind
	async reload() {
		this.setState({
			isLoading: true,
			thing: null,
		});

		await this.loadThing(this.state.thingId);
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div className="center-fill">
					{/* <NonIdealState
						title={this.props.loadingMessage || 'Loading...'}
						icon={<Spinner />}
					/> */}
				</div>
			);
		}

		if (!this.state.thing) {
			if (this.props.errorLoadingVisual) {
				return (
					<div className="center-fill">
						{this.props.errorLoadingVisual}
					</div>
				);
			}

			return (
				<div className="center-fill">
					{/* <NonIdealState
						title={this.props.errorLoadingMessage || 'There was an issue loading this page.'}
						icon='issue'
						description={this.props.errorLoadingDescription}
					/> */}
				</div>
			);
		}

		return this.props.render(this.state.thing, this.reload);
	}
}

export default ThingLoader;
