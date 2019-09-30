// This file just re-exports existing services. Add your services in here and register them in inversify.

export * from "./client";
export * from "./inversify"; // This must be imported before the services that use it are imported.
export * from "./services";

export * from "./historyService";

if (module && module.hot) {
	module.hot.decline();
}
