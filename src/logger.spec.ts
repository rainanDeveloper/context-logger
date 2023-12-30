import { describe, it } from "node:test";
import { LogLevel, Logger } from "./logger";
import {equal} from "node:assert";
import { cliColors } from "./utils/cli-colors";

describe('Logger', () => {
    const unitTestContextMock = 'Logger Unit Test';
    let loggerInstance: Logger = new Logger(unitTestContextMock);
    it('Logger instance should be defined and an instance of Logger', () => {
        equal(!loggerInstance, false);
        equal((loggerInstance instanceof Logger), true);
    });

    describe('getColorByLogLevel', () => {
        it('should get the color magentaBright since the log level is \'debug\'', async () => {
            const logLevelMock: LogLevel = 'debug';

            const result = loggerInstance.getColorByLogLevel(logLevelMock);

            equal(result, cliColors.magentaBright);
        });

        it('should get the color yellow since the log level is \'warn\'', async () => {
            const logLevelMock: LogLevel = 'warn';

            const result = loggerInstance.getColorByLogLevel(logLevelMock);

            equal(result, cliColors.yellow);
        });

        it('should get the color red since the log level is \'error\'', async () => {
            const logLevelMock: LogLevel = 'error';

            const result = loggerInstance.getColorByLogLevel(logLevelMock);

            equal(result, cliColors.red);
        });

        it('should get the color cyanBright since the log level is \'verbose\'', async () => {
            const logLevelMock: LogLevel = 'verbose';

            const result = loggerInstance.getColorByLogLevel(logLevelMock);

            equal(result, cliColors.cyanBright);
        });

        it('should get the color bold since the log level is \'fatal\'', async () => {
            const logLevelMock: LogLevel = 'fatal';

            const result = loggerInstance.getColorByLogLevel(logLevelMock);

            equal(result, cliColors.bold);
        });
    });
})