import fs from 'fs';
import { Command } from 'commander';
import React from 'react';
import { render } from 'ink';
import pkg from '../package.json';
import App from './components/App';

const program = new Command('log-viewer')
  .version(pkg.version, '-v, --version')
  .requiredOption('-f, --file <path>', 'log file')
  .option('-c, --config <path>', 'log config file', 'log.config.json')
  .parse(process.argv);

if (program.file) {
  const data = fs.readFileSync(program.file);
  const logs = processData(data);
  const config = JSON.parse(fs.readFileSync(program.config));

  console.log(config);
  render(<App config={config} logs={logs} />);
}

function processData(data) {
  return data
    .toString()
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return { message: line };
      }
    });
}
