#!/usr/bin/env node

const command: string = process.argv[2];
const option1: string = process.argv[3];
const option2: string = process.argv[4];

const { readFile, createReactSnaptestFile } = require('./scripts');

const main = (): void => {
  if (!command) {
    process.stdout.write('invalid command\n');
    return;
  }

  if (command === 'readf' && option1) {
    const filepath = option1;
    readFile(filepath);
    return;
  } else if (command === 'create-react-snaptest-file' && option1 && option2) {
    const filepath = option1;
    const match = option2;
    createReactSnaptestFile(filepath, match);
    return;
  } else {
    process.stdout.write('invalid argument\n');
    return;
  }
};

main();
