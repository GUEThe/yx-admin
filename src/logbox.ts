const enum LogLevel {
  debug = 1,
  info,
  warn,
  error,
}

interface CDVBugly {
  log(level: string, messasge: string): void;
  postException(errorMessage: string, extras: { [key: string]: any }): void;
}

declare var cdvbugly: CDVBugly;

export class Log {
  static debug(msg: string, ...extras: any[]) {
    this.log(LogLevel.debug, msg, extras);
  }

  static info(msg: string, ...extras: any[]) {
    this.log(LogLevel.info, msg, extras);
  }

  static warn(msg: string, ...extras: any[]) {
    this.log(LogLevel.warn, msg, extras);
  }

  static error(msg: string, ...extras: any[]) {
    this.log(LogLevel.error, msg, extras);
  }

  static postException(errorMessage: string, extras: { [key: string]: any }) {
    console.error(errorMessage, extras);
  }

  private static log(level: LogLevel, msg: string, extras: any[]) {
    let levelTag = 'info';
    switch (level) {
      case LogLevel.debug:
        console.debug(msg, ...extras);
        break;
      case LogLevel.info:
        console.info(msg, ...extras);
        break;
      case LogLevel.warn:
        console.warn(msg, ...extras);
        levelTag = 'warn';
        break;
      case LogLevel.error:
        levelTag = 'error';
        console.error(msg, ...extras);
        break;
    }
  }
}
