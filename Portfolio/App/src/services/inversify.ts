import { Container } from 'inversify';
import 'reflect-metadata';
import getDecorators from 'inversify-inject-decorators';

import baseUrl from '../config';
import { Client } from './client';
import Service from './service';
import {
	HistoryService,
	PingService,
} from '.';

const myContainer = new Container();

myContainer.bind(Service.Client).toConstantValue(new Client(baseUrl));
myContainer.bind(Service.History).to(HistoryService).inSingletonScope();
myContainer.bind(Service.Ping).to(PingService).inSingletonScope();
// Register things here.

const { lazyInject } = getDecorators(myContainer);

export { myContainer as Container, lazyInject };
