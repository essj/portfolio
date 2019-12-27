import { injectable, inject } from 'inversify';
import * as C from './client';
import {
	Service,
} from '.';

@injectable()
class PingService {
	@inject(Service.Client) private client: C.Client;

	public list(): Promise<C.IPingDto[]> {
		return this.client.list();
	}

	public ping(userName: string | null, type: string | null): Promise<void> {
		return this.client.ping(userName, type);
	}
}

export default PingService;
