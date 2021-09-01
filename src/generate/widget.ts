import path from 'path';
import { cwd } from 'process';
import { ensureFileSync, existsSync, writeFileSync } from 'fs-extra';
import yargs from 'yargs';
import { Log } from '../log';
import { getSchematicName, interpolateString } from './helpers';

const routeAwareTitle = (): string => {
  return ' with RouteAware';
}

const hookedStatefulBody = (hk: boolean): string => {
  return hk
    ? `@override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    // RouterService.routeObserver.subscribe(this, ModalRoute.of(context)!);
  }

  @override
  void didPushNext() {
    // implement logic on next route/page pushed
  }

  @override
  void didPopNext() {
    // implement on route/page popped logic here
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    throw UnimplementedError();
  }

  @override
  void dispose() {
    super.dispose();
  }`
    : `@override
  Widget build(BuildContext context) {
    // TODO: implement build
    throw UnimplementedError();
  }`;
}



const statelessWidget = (opts: { hooks?: boolean; }): string => {
  return `import 'package:flutter/material.dart';

  class {{widgetName}} extends StatelessWidget${opts.hooks ? routeAwareTitle() : ''} {  
    @override
    Widget build(BuildContext context) {
      // TODO: implement build
      throw UnimplementedError();
    }
  }
  `;
}

const statefulWidget = (opts: { hooks: boolean; }): string => {
  return `import 'package:flutter/material.dart';

class {{widgetName}} extends StatefulWidget {
  @override
  _{{widgetName}}State createState() {
    return _{{widgetName}}State();
  }
}

class _{{widgetName}}State extends State<{{widgetName}}>${opts.hooks ? routeAwareTitle() : ''} {
  ${hookedStatefulBody(opts.hooks)}
}
  `;
}

// Example command: mb g w splash-screen --hooks --stateful
export const generateWidget = (name: string) => {
  const dir = cwd();
  const filename = path.normalize(`${dir}/${name}.dart`);

  const options: any = yargs.argv;

  const widgetName = getSchematicName(name);

  if (widgetName.err) {
    Log.error(widgetName.err);
    return;
  }

  if (existsSync(filename)) {
    Log.error('Could not create widget because it already exists in same destination');
    return;
  }

  // creates the file and directory path
  ensureFileSync(filename);

  // writes content to the file
  const content = options.stateful ? statefulWidget(options) : statelessWidget(options);
  const varMap = {
    widgetName: widgetName.name,
  };

  writeFileSync(filename, interpolateString(content, varMap));
}
