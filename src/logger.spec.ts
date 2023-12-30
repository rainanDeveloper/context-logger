import { describe, it } from "node:test";
import { Logger } from "./logger";
import {equal} from "node:assert";

describe('Logger', () => {
    const unitTestContextMock = 'Logger Unit Test';
    let loggerInstance: Logger = new Logger(unitTestContextMock);
    it('Logger instance should be defined and a instance of Logger', () => {
        equal(!loggerInstance, false);
        equal((loggerInstance instanceof Logger), true);
    });
})