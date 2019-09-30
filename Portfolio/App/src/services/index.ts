// This file just re-exports existing services. Add your services in here and register them in inversify.

export * from './historyService';

export * from './client';
export * from './services';
export * from './inversify';

if (module && module.hot) {
	module.hot.decline();
}
