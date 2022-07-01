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

    default: {
      throw Error('A valid environment must be specified');
    }
  }
}
