import * as C from './client';
import { injectable, inject } from 'inversify';
import Service from './service';

@injectable()
class PingService {
	constructor(@inject(Service.Client) private client: C.Client) {
	}

	ping(userName: string | null, type: string | null): Promise<void> {
		console.log("here")
		return this.client.ping(userName, type);
	}
}

export default PingService;
