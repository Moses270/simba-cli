import { setV4WorkEnvironment } from "./env/v4work_env";

export const embySetCommand = (env: string) => {
  switch (env.toLowerCase()) {
    case 'v4work': {
      setV4WorkEnvironment();
      break;
    }

    default: {
      throw Error('A valid environment must be specified');
    }
  }
}
