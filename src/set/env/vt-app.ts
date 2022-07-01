import yargs from 'yargs';
import path from 'path';
import { cwd } from 'process';
import { readFileSync, writeFileSync } from 'fs';
import { Log } from '../../log';

// Example command: simba env vt-app --prod --deploy-version=2022070101 --version=4.2.3
export const setVtAppEnvironment = () => {
  const options: any = yargs.argv;
  const cwDir = cwd();
  const isProd = !!options.prod;
  const deploymentVersion = options['deploy-version'];
  const versionNumber = options['version-number'];

  // update config file
  try {
    const configPath = path.normalize(cwDir + '/lib/shared/utils/config.dart');
    const file = readFileSync(configPath).toString();
    const lines = file.split('\n');

    // used to iterate through the config file and file marks for each update
    const marks = [
      {
        mark: 'static bool isProd',
        tranform: (cur: string, mark: string): string => {
          return cur.substring(0, cur.indexOf(mark) + mark.length) + ` = ${isProd};`;
        }
      },
      {
        mark: 'static String versionNumber',
        tranform: (cur: string, mark: string): string => {
          return versionNumber ? cur.substring(0, cur.indexOf(mark) + mark.length) + ` = '${versionNumber}';` : cur;
        }
      },
      {
        mark: 'static String deploymentVersion',
        tranform: (cur: string, mark: string): string => {
          return deploymentVersion ? cur.substring(0, cur.indexOf(mark) + mark.length) + ` = '${deploymentVersion}';` : cur;
        }
      }
    ];

    for (let a = 0; a < lines.length; a++) {
      const line = lines[a];

      for (const item of marks) {
        if (line.includes(item.mark)) {
          const newline = item.tranform(line, item.mark);
          lines[a] = newline;
        }
      }
    }

    writeFileSync(configPath, lines.join('\n'));

    // update google-services.json file
    //   const gsBasePath = '/android/app';
    //   const googleServices = readFileSync(
    //     path.normalize(cwDir + gsBasePath + `/google-services ${isProd ? 'prod' : 'dev'}.json`)
    //   ).toString();

    //   writeFileSync(path.normalize(cwDir + gsBasePath + `/google-services.json`), googleServices);

    // updates web index.html version as well
    if (deploymentVersion) {
      const webPath = path.normalize(cwDir + '/web/index.html');
      const html = readFileSync(webPath).toString();
      const htmlCode = html.split('\n');
      const htmlVersionMark = '"main.dart.js';

      for (let a = 0; a < htmlCode.length; a++) {
        const line = htmlCode[a];

        if (line.includes(htmlVersionMark)) {
          const pos = line.indexOf(htmlVersionMark);
          let rightText = line.substring(pos + htmlVersionMark.length);
          rightText = rightText.substring(rightText.indexOf('"'));

          const newline = `${line.substring(0, pos + htmlVersionMark.length)}?v=${deploymentVersion}${rightText}`;
          htmlCode[a] = newline;
        }
      }

      writeFileSync(webPath, htmlCode.join('\n'));
    }
  } catch (e) {
    throw Error('Error while reading and updating V4Work config file');
  }

  Log.info(`Environment now pointing to ${isProd ? 'production' : 'dev'}`);
  console.log('Please, run `flutter clean` command before next build to ensure a clean build.');
}