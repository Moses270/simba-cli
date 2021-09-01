import { Log } from '../log';
import { generateWidget } from './widget';

export const generateSchematic = (sch: string, name: string) => {
  if (!name) {
    Log.error('Schematic name must be specified');
    return;
  }

  switch (sch) {
    case 'w': case 'widget': {
      generateWidget(name);

      break;
    }

    default: {
      Log.error('Invalid schematic name or options specified!');
      Log.log(
        'Use format `mb generate <schematic> [options]` command or check our docs at https://embyconcept.com to learn more.\n\n',
        'Possible Schematics:\n',
        '- widget (alias: w)',
        '\n\n\n',
      );
    }
  }
}
