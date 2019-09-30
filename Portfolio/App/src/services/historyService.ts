import { createHashHistory as createHistory, History as HistoryDef } from 'history';
import { RouterStore, syncHistoryWithStore, SynchronizedHistory } from 'mobx-react-router';
import { injectable } from 'inversify';

// We wrap the react-router history method with mobx-react-router to make it observable.
// https://github.com/alisd23/mobx-react-router

@injectable()
export class HistoryService {
	store: RouterStore;
	history: SynchronizedHistory;

	constructor() {
		this.store = new RouterStore();
		this.history = syncHistoryWithStore(createHistory(), this.store);
	}
}