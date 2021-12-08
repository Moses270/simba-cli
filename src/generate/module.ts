import path from 'path';
import { cwd } from 'process';
import { ensureFileSync, existsSync, writeFileSync } from 'fs-extra';
import yargs from 'yargs';
import { Log } from '../log';


// Example command: as g w splash-screen --hooks --stateful
export const generateModule = (sName: string) => {
  const dir = cwd();
  const options: any = yargs.argv;
  const name = sName.split('/').reverse()[0];
  const base = `${dir}/${sName}`;

  if (!name) {
    throw Error(`Invalid module name: ${sName}`);
  }

  const filenames = 'controller,service,route,validator'.split(',').map(n => {
    return path.normalize(`${base}/${n}.${options.js ? 'js' : 'ts'}`);
  });

  if (existsSync(base)) {
    Log.error('Could not create module because it already exists in same destination');
    return;
  }

  filenames.forEach(f => {
    ensureFileSync(f);
    writeFileSync(f, '');
    console.log(`Created file: ${f.replaceAll('\\', '/')}`);
  });
}
