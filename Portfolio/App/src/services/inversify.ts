import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import 'reflect-metadata';

import { baseUrl } from '../config';

import { Client } from './client';
import { HistoryService } from './historyService';

import { Services } from './services';

const myContainer = new Container();

myContainer.bind(Services.Client).toConstantValue(new Client(baseUrl));
myContainer.bind(Services.History).to(HistoryService).inSingletonScope();
// Register things here.

let { lazyInject } = getDecorators(myContainer);

export { myContainer as Container, lazyInject };
