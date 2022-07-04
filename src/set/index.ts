import { setSupplierAppEnvironment } from './env/sp-app';
import { setV4WorkEnvironment } from './env/v4work_env';
import { setVtAppEnvironment } from './env/vt-app';

export const setProjectEnvironment = (env: string) => {
  switch (env.toLowerCase()) {
    case 'v4work': {
      setV4WorkEnvironment();
      break;
    }

    case 'vt-app': {
      setVtAppEnvironment();
      break;
    }

    case 'sp-app': case 'supplier-app': {
      setSupplierAppEnvironment();
      break;
    }

    default: {
      throw Error(`Project ${env} not found in commands list setup`);
    }
  }
}
