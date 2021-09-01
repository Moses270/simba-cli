import { copyFileSync } from 'fs-extra';

[
    'package.json',
    'package-lock.json',
    'README.md'
].forEach(p => {
    copyFileSync(`./${p}`, `./bin/${p}`);
});
