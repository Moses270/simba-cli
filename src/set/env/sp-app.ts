import yargs from 'yargs';
import path from 'path';
import { cwd } from 'process';
import { readFileSync, writeFileSync } from 'fs';
import { Log } from '../../log';

// Example command: simba env vt-app --prod --deploy-version=2022070101 --version=4.2.3
export const setSupplierAppEnvironment = () => {
  const options: any = yargs.argv;
  const cwDir = cwd();
  const isProd = !!options.prod;
  const deploymentVersion: string = options['deploy-version'];
  const versionNumber: string = options['version-number'];

  console.log(`Options: deployment version=${deploymentVersion}; version number=${versionNumber}; production=${isProd}`);

  // update config file
  try {
    const configPath = path.normalize(cwDir + '/lib/utils/serverconstants.dart');
    const file = readFileSync(configPath).toString();
    const lines = file.split('\n');

    // used to iterate through the config file and file marks for each update
    const marks = [
      {
        mark: 'static bool production',
        tranform: (cur: string, mark: string): string => {
          return cur.substring(0, cur.indexOf(mark) + mark.length) + ` = ${isProd};`;
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

          const newline = `${line.substring(0, pos + htmlVersionMark.length)}?version=${deploymentVersion}${rightText}`;
          htmlCode[a] = newline;
        }
      }

      writeFileSync(webPath, htmlCode.join('\n'));
    }

    // pubspec.yaml version update
    if (versionNumber) {
      const pubspecPath = path.normalize(cwDir + '/pubspec.yaml');
      const content = readFileSync(pubspecPath).toString();
      const lines = content.split('\n');
      const versionMark = 'version: ';
      let versionCode = versionNumber.split('.').join('');

      if (versionCode.length < 5) {
        versionCode = (versionCode + '00000').substring(0, 5);
      }

      for (let a = 0; a < lines.length; a++) {
        const line = lines[a];

        if (line.startsWith(versionMark)) {
          const pos = line.indexOf(versionMark);

          const newline = `${line.substring(0, pos + versionMark.length)}${versionNumber}+${versionCode}`;
          lines[a] = newline;
        }
      }

      writeFileSync(pubspecPath, lines.join('\n'));
    }
  } catch (e) {
    throw Error('Error while reading and updating Supplier app config files');
  }

  Log.info(`Environment now pointing to ${isProd ? 'production' : 'dev'}`);
  console.log('Please, run `flutter clean` command before next build to ensure a clean build.');
}
