import yargs from 'yargs';
import path from 'path';
import { cwd } from 'process';
import { readFileSync, writeFileSync } from 'fs';
import { Log } from '../../log';

// Example command: mb env v4work --prod
export const setV4WorkEnvironment = () => {
  const options: any = yargs.argv;
  const cwDir = cwd();
  const isProd = !!options.prod;

  // update config file
  try {
    const configPath = path.normalize(cwDir + '/lib/shared/utils/config.dart');
    const file = readFileSync(configPath).toString();
    const lines = file.split('\n');
    const mark = 'static bool isProd';

    for (let a = 0; a < lines.length; a++) {
      const line = lines[a];

      if (line.includes(mark)) {
        const newline = line.substr(0, line.indexOf(mark) + mark.length) + ` = ${isProd};`;
        lines[a] = newline;
      }
    }

    writeFileSync(configPath, lines.join('\n'));
  } catch (e) {
    throw Error('Error while reading and updating V4Work config file');
  }

  // update google-services.json file
  try {
    const gsBasePath = '/android/app';
    const googleServices = readFileSync(
      path.normalize(cwDir + gsBasePath + `/google-services ${isProd ? 'prod' : 'dev'}.json`)
    ).toString();

    writeFileSync(path.normalize(cwDir + gsBasePath + `/google-services.json`), googleServices);
  } catch (e) {
    throw Error('Error while reading and updating V4Work google services file');
  }

  Log.info(`Environment now pointing to ${isProd ? 'production' : 'dev'}`);
  console.log('Please, run `flutter clean` command next to ensure a clean build.');
}
