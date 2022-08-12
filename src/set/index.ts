import { Log } from '../log';
import { setSupplierAppEnvironment } from './env/sp-app';
import { setV4WorkEnvironment } from './env/v4work_env';
import { setVtAppEnvironment } from './env/vt-app';

const apps: { names: string[]; fn: () => void; }[] = [
  {
    names: ['v4work'],
    fn: setV4WorkEnvironment
  },
  {
    names: ['vt-app'],
    fn: setVtAppEnvironment
  },
  {
    names: ['sp-app', 'supplier-app'],
    fn: setSupplierAppEnvironment
  }
];

export const setProjectEnvironment = (proj: string) => {
  if (proj === 'apps') {
    // list all supported applications here
    Log.log('Env apps list');
    Log.info(apps.map(a => a.names.join(' or ')).join('\n'));
  } else {
    const app = apps.find(a => a.names.includes(proj));

    if (app) {
      app.fn();
    } else {
      throw Error(`Unsupported or invalid project identifier: ${proj}`);
    }
  }
}
