import "reflect-metadata";
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

import { baseUrl } from "../config";
import { Client } from "./client";
import { HistoryService } from "./historyService";
import { Services } from "./services";

const myContainer = new Container();

myContainer.bind(Services.Client).toConstantValue(new Client(baseUrl));
myContainer.bind(Services.History).to(HistoryService).inSingletonScope();
// Register things here.

const { lazyInject } = getDecorators(myContainer);

export { myContainer as Container, lazyInject };
