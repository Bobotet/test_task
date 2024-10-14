import { LoggerService, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class MyLogger implements LoggerService {
  private readonly logsPath: string = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'logs',
    'logs.log'
  );
  private readonly errorLogsPath: string = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'logs',
    'errors.log'
  );
  logApi(message: any) {
    fs.appendFile(
      this.logsPath,
      JSON.stringify(message) + `\n`,
      (error: any) => {
        if (error) {
          console.error('Error in log: ' + error);
        }
      }
    );
  }
  log() {}

  fatal(message: any) {
    console.error(message);
  }

  error(message: any) {
    console.error(message);
    fs.appendFile(
      this.errorLogsPath,
      message.toString() + `\n`,
      (error: any) => {
        if (error) {
          console.error('Error in log error: ' + error);
        }
      }
    );
  }

  warn(message: any) {
    console.warn(message);
  }
}
