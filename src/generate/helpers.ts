import { startCase, template, templateSettings } from 'lodash';
import { Map } from '../models/interface';

export const getSchematicName = (name: string): { err?: string; name: string; } => {
  const parts = name.toLowerCase().split('/').map(s => s.trim()).filter(s => !!s);
  const last = parts[parts.length - 1];
  const res = { err: '', name: '' };

  const isValidName = /^[a-zA-Z0-9\_\-]*$/.test(last);

  if (isValidName) {
    for (const n of last.split('-')) {
      res.name += startCase(n).replace(new RegExp(' ', 'g'), '');
    }
  } else {
    res.err = 'Invalid widget name: ' + last;
  }

  return res;
}

export const interpolateString = (text: string, varMap: Map<any>): string => {
  templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  const interpolator = template(text);
  const interpolated = interpolator(varMap);

  return interpolated;
}
