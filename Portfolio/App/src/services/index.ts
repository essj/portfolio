// This file just re-exports existing services. Add your services in here and register them in inversify.

export * from './client';
export * from './inversify'; // This must be imported before the services that use it are imported.
export { default as Service } from './service';

// Re-export existing services.
export { default as HistoryService } from './historyService';
export { default as PingService } from './pingService';

if (module && module.hot) {
	module.hot.decline();
}
