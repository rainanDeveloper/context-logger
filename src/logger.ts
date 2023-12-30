import { cliColors } from "./utils/cli-colors";

export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';

export class Logger {
    constructor(private readonly context?: string) {}

    public getColorByLogLevel(logLevel: LogLevel) {
        switch (logLevel) {
            case 'debug':
              return cliColors.magentaBright;
            case 'warn':
              return cliColors.yellow;
            case 'error':
              return cliColors.red;
            case 'verbose':
              return cliColors.cyanBright;
            case 'fatal':
              return cliColors.bold;
            default:
              return cliColors.green;
        }
      
    }

    public colorize(message: string, logLevel: LogLevel) {
        const color = this.getColorByLogLevel(logLevel);
        return color(message);
    }

    public formatPID(pid: number, logLevel: LogLevel) {
        return this.colorize(`pid: [${pid}]`, logLevel);
    }

    public formatContext() {
        return cliColors.yellow(`[${this.context}]`)
    }

    public formatLogLevel(logLevel: LogLevel) {
        return this.colorize(`[${logLevel.toUpperCase()}]`, logLevel);
    }

    public formatMessage(message: string, logLevel: LogLevel) {
        const PIDMessage = this.formatPID(process.pid, logLevel);
        const timestamp = this.getCurrentTimestampFormatted();
        const formattedLogLevel = this.formatLogLevel(logLevel);
        message = this.colorize(message, logLevel);
        message = ` ${message}`;
        const contextMessage = this.formatContext();
        return `${PIDMessage} - ${timestamp} ${formattedLogLevel} ${contextMessage}${message}\n`;
    }

    public getCurrentTimestampFormatted() {
        return new Date().toLocaleString(process.env.LOCALE || 'en-US');
    }

    private printMessage(message: string, logLevel: LogLevel) {
        const finalMessage = this.formatMessage(message, logLevel);

        process.stdout.write(finalMessage);
    }

    public log (message: string) {
        this.printMessage(message, 'log');
    }

    public error(message: string) {
        this.printMessage(message, 'error');
    }

    public warn(message: string) {
        this.printMessage(message, 'warn');
    }

    public debug(message: string) {
        this.printMessage(message, 'debug');
    }

    public verbose(message: string) {
        this.printMessage(message, 'verbose');
    }

    public fatal(message: string) {
        this.printMessage(message, 'fatal');
    }
}