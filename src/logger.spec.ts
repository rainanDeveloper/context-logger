import { describe, it } from "mocha";
import { Logger } from "./logger";
import * as assert from 'node:assert';

describe('Logger', () => {
    const unitTestContextMock = 'Logger Unit Test';
    let loggerInstance: Logger = new Logger(unitTestContextMock);
    it('Logger instance should be defined and an instance of Logger', () => {
        assert.equal(!loggerInstance, false);
        assert.equal((loggerInstance instanceof Logger), true);
    });

    describe('log', () => {
        it('should log to the stdout the message, building correctly a log', async () => {
            //Arrange
            //Act
            //Assert
        });
    });
})