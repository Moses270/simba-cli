#! /usr/bin/env node

import { Log } from './log';
import yargs from 'yargs';
import { generateSchematic } from './generate';
import { setProjectEnvironment } from './set';

const options: any = yargs
  .usage(`Usage: simba generate <schematics> <name> [options]
  
  schematics:
    widget (alias: w)     Generates a Flutter/Dart widget
    component (alias c)   Generates an angular component with all the default props and content
    class (alias cl)      Generates a JavaScript/Typescript class
    module (alias m)      Generates a node.js module with controller, service, route and validator
    function (alias fn)   Generates a JavaScript/Typescript function

  name: The name to assign newly generated schematic
  \n\n
    `)
  .usage(`Usage: simba env <project> [options]
  project: The name/ID of project to be updated
  \n\n
  `)
  .option('st', {
    alias: 'stateful',
    describe: 'Used to generate a stateful schematic like a Stateful Widget',
    type: 'boolean',
    demandOption: false
  })
  .option('js', {
    alias: 'javascript',
    describe: 'Used to generate a schematic for JavaScript instead of the default Typescript',
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
      setProjectEnvironment(args[1]);

      break;
    }

    // case undefined: {
    //   welcomeText();
    //   break;
    // }

    default: {
      Log.error('Invalid or unspecified command!');
      Log.log('Run `simba --help` command for instructions or check our docs at https://embyconcept.com to learn more.\n\n\n');
    }
  }
})();
