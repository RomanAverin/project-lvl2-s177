#!/usr/bin/env node

import program from 'commander';
import { readFile } from 'fs/promises';

import gendiff from '../src/index.js';

const packageFile = JSON.parse(
  await readFile(
    new URL('../package.json', import.meta.url)
)
);

program
  .version(packageFile.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'visual')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, option) => {
    console.log(gendiff(firstConfig, secondConfig, option.format));
  })
  .parse(process.argv);
