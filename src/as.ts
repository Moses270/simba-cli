#! /usr/bin/env node

import { Log } from './log';
import yargs from 'yargs';
import { generateSchematic } from './generate';
import { embySetCommand } from './set';

const options: any = yargs
  .usage(`Usage: mb generate <schematics> <name> [options]
  
  Schematics:
widget (alias: w)     Generates a Flutter/Dart widget
component (alias c)   Generates an angular component with all the default props and content
class (alias cl)      Generates a JavaScript/Typescript class
function (alias fn)   Generates a JavaScript/Typescript function`)
  .usage('Usage: mb env flutter [options]')
  .option('st', {
    alias: 'stateful',
    describe: 'Used to generate a stateful schematic like a Stateful Widget',
    type: 'boolean',
    demandOption: false
  })
  .options('exp', {
    alias: 'export',
    describe: 'Add the export keyword to the generated schematic',
    type: 'boolean',
    demandOption: false,
  })
  .option('hks', {
    alias: 'hooks',
    describe: 'Used to include the lifecycle hooks of a generated schematics',
    type: 'boolean',
    demandOption: false
  })
  .option('h', {
    alias: 'help',
    describe: 'Show helpful info about this cli',
    type: 'boolean',
    demandOption: false
  })
  .argv;

(function () {
  const args: string[] = options._;

  switch (args[0]) {
    case 'g': case 'generate': {
      generateSchematic(args[1], args[2]);

      break;
    }

    case 'env': {
      embySetCommand(args[1]);

      break;
    }

    // case undefined: {
    //   welcomeText();
    //   break;
    // }

    default: {
      Log.error('Invalid or unspecified command!');
      Log.log('Run `mb --help` command for instructions or check our docs at https://anchorsolutions.nl to learn more.\n\n\n');
    }
  }
})();
