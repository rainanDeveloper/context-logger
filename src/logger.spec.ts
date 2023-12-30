import { describe, it } from "node:test";
import { Logger } from "./logger";
import {equal} from "node:assert";

describe('Logger', () => {
    it('Should create a new Logger instance', () => {
        const logger = new Logger();

        equal((logger instanceof Logger), true);
    });
})