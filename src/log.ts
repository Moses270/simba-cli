import chalk from 'chalk';
import boxen, { Options } from 'boxen';

export class Log {
  private static print(msg: string, bg?: Options['backgroundColor'], brd?: Options['borderColor']): void {
    const greeting = chalk.white.bold(msg);

    const boxenOptions: Options = {
      padding: 1,
      margin: 1,
      borderStyle: 'classic',
      float: 'center',
      borderColor: brd,
      backgroundColor: bg,
    };

    const msgBox = boxen(greeting, boxenOptions);

    console.log(msgBox);
  }

  static error(msg: string): void {
    Log.print(msg, 'redBright', 'red');
  }

  static info(msg: string): void {
    Log.print(msg, 'magenta', 'magentaBright');
  }

  static success(msg: string): void {
    Log.print(msg, 'green', 'greenBright');
  }

  static log(...msg: any[]): void {
    console.log(...msg);
  }
}
