import { describe, it } from "mocha";
import { Logger } from "./logger";
import * as assert from 'node:assert';
import * as sinon from "sinon";
import { cliColors } from "./utils/cli-colors";
import { error } from "node:console";

describe('Logger', () => {
    const unitTestContextMock = 'Logger Unit Test';
    let loggerInstance: Logger = new Logger(unitTestContextMock);

    const nowMock = new Date();
    let clock = sinon.useFakeTimers({
        now: nowMock,
    });
    clock.restore();
    let processStdoutWriteSpy = sinon.spy(process.stdout, 'write');
    processStdoutWriteSpy.restore();

    beforeEach(() => {
        clock = sinon.useFakeTimers({
            now: nowMock
        });

        processStdoutWriteSpy = sinon.spy(process.stdout, 'write');
    });
    afterEach(() => {
        clock.restore();
        processStdoutWriteSpy.restore();
    })

    it('Logger instance should be defined and an instance of Logger', () => {
        assert.equal(!loggerInstance, false);
        assert.equal((loggerInstance instanceof Logger), true);
    });

    describe('log', () => {
        it('should log to the stdout the message, building correctly a log', async () => {
            const PIDMessageMock = cliColors.green(`pid: [${process.pid}]`);
            const timestampMock = (new Date()).toLocaleString();
            const formattedLogLevelMock = cliColors.green(`[LOG]`);
            const contextMessageMock = cliColors.yellow(`[${unitTestContextMock}]`);
            const messageMock = `Some logging message`;

            const formattedMessageMock = 
                `${PIDMessageMock} - ${timestampMock} ${formattedLogLevelMock} ${contextMessageMock} ${cliColors.green(messageMock)}\n`;
            
            const result = loggerInstance.log(messageMock);
            
            assert.deepStrictEqual(result, undefined);
            assert.ok(processStdoutWriteSpy.calledOnceWithExactly(formattedMessageMock));
        });
    });

    describe('error', () => {
        it('should log an error to the stdout the message, building correctly a log', async () => {
            const PIDMessageMock = cliColors.red(`pid: [${process.pid}]`);
            const timestampMock = (new Date()).toLocaleString();
            const formattedLogLevelMock = cliColors.red(`[ERROR]`);
            const contextMessageMock = cliColors.yellow(`[${unitTestContextMock}]`);
            const messageMock = `Some logging message`;

            const formattedMessageMock = 
                `${PIDMessageMock} - ${timestampMock} ${formattedLogLevelMock} ${contextMessageMock} ${cliColors.red(messageMock)}\n`;            
            
            const result = loggerInstance.error(messageMock);
            
            assert.deepStrictEqual(result, undefined);
            assert.ok(processStdoutWriteSpy.calledOnceWithExactly(formattedMessageMock));
        });
    });

    describe('warn', () => {
        it('should log an warning to the stdout the message, building correctly a log', async () => {
            const PIDMessageMock = cliColors.yellow(`pid: [${process.pid}]`);
            const timestampMock = (new Date()).toLocaleString();
            const formattedLogLevelMock = cliColors.yellow(`[WARN]`);
            const contextMessageMock = cliColors.yellow(`[${unitTestContextMock}]`);
            const messageMock = `Some logging message`;

            const formattedMessageMock = 
                `${PIDMessageMock} - ${timestampMock} ${formattedLogLevelMock} ${contextMessageMock} ${cliColors.yellow(messageMock)}\n`;            
            
            const result = loggerInstance.warn(messageMock);
            
            assert.deepStrictEqual(result, undefined);
            assert.ok(processStdoutWriteSpy.calledOnceWithExactly(formattedMessageMock));
        });
    });

    describe('debug', () => {
        it('should log an debug log to the stdout the message, building correctly a log', async () => {
            const PIDMessageMock = cliColors.magentaBright(`pid: [${process.pid}]`);
            const timestampMock = (new Date()).toLocaleString();
            const formattedLogLevelMock = cliColors.magentaBright(`[DEBUG]`);
            const contextMessageMock = cliColors.yellow(`[${unitTestContextMock}]`);
            const messageMock = `Some logging message`;

            const formattedMessageMock = 
                `${PIDMessageMock} - ${timestampMock} ${formattedLogLevelMock} ${contextMessageMock} ${cliColors.magentaBright(messageMock)}\n`;            
            
            const result = loggerInstance.debug(messageMock);
            
            assert.deepStrictEqual(result, undefined);
            assert.ok(processStdoutWriteSpy.calledOnceWithExactly(formattedMessageMock));
        });
    });
})