import { createHashHistory } from 'history';
import { injectable } from 'inversify';
import { RouterStore, syncHistoryWithStore, SynchronizedHistory } from 'mobx-react-router';

// We wrap the react-router history method with mobx-react-router to make it observable.
// https://github.com/alisd23/mobx-react-router

@injectable()
class HistoryService {
	public store: RouterStore;
	public history: SynchronizedHistory;

	constructor() {
		this.store = new RouterStore();
		this.history = syncHistoryWithStore(createHashHistory(), this.store);
	}
}

export default HistoryService;
