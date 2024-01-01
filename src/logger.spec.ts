import { describe, it } from "mocha";
import { Logger } from "./logger";
import * as assert from 'node:assert';
import * as sinon from "sinon";
import { cliColors } from "./utils/cli-colors";

describe('Logger', () => {
    const unitTestContextMock = 'Logger Unit Test';
    let loggerInstance: Logger = new Logger(unitTestContextMock);
    it('Logger instance should be defined and an instance of Logger', () => {
        assert.equal(!loggerInstance, false);
        assert.equal((loggerInstance instanceof Logger), true);
    });

    describe('log', () => {
        const nowMock = new Date();
        let clock = sinon.useFakeTimers({
            now: nowMock,
        })
        clock.restore();

        beforeEach(() => {
            clock = sinon.useFakeTimers({
                now: nowMock
            });
        });
        afterEach(() => {
            clock.restore();
        })
        it('should log to the stdout the message, building correctly a log', async () => {
            const PIDMessageMock = cliColors.green(`pid: [${process.pid}]`);
            const timestampMock = (new Date()).toLocaleString();
            const formattedLogLevelMock = cliColors.green(`[LOG]`);
            const contextMessageMock = cliColors.yellow(`[${unitTestContextMock}]`);
            const messageMock = `Some logging message`;

            const formattedMessageMock = 
                `${PIDMessageMock} - ${timestampMock} ${formattedLogLevelMock} ${contextMessageMock} ${cliColors.green(messageMock)}\n`;

            const processStdoutWriteSpy = sinon.spy(process.stdout, 'write');
            
            const result = loggerInstance.log(messageMock);
            
            assert.deepStrictEqual(result, undefined);
            assert.ok(processStdoutWriteSpy.calledOnceWithExactly(formattedMessageMock));
        });
    });
})