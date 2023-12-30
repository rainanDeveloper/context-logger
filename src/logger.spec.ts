import { describe, it, mock } from "node:test";
import { Logger } from "./logger";
import { equal, strictEqual } from "node:assert";
import { cliColors } from "./utils/cli-colors";

describe('Logger', () => {
    const unitTestContextMock = 'Logger Unit Test';
    let loggerInstance: Logger = new Logger(unitTestContextMock);
    it('Logger instance should be defined and an instance of Logger', () => {
        equal(!loggerInstance, false);
        equal((loggerInstance instanceof Logger), true);
    });

    describe('log', () => {
        it('It should print a log to the default output (process.stdout)', async () => {
            const messageMock = 'Some test message';
            process.stdout.write = mock.fn(()=>true, {times: 1});
    
            loggerInstance.log(messageMock);
    
            strictEqual(process.stdout.write['mock'].callCount(), 1);
            strictEqual(process.stdout.write['mock'].calls[0].arguments.length, 1);
        });
    })
})