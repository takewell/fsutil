#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { Oneliner, Script } from './scripts/index';

const config = [
  {
    command: 'echo',
    script: echo,
    args: [
      {
        type: 'input',
        name: 'msg',
        message: '何か文字を入力'
      }
    ]
  },
  {
    command: 'search regexp',
    script: Script.search,
    args: [
      {
        type: 'input',
        name: 'target',
        message: 'ターゲットとなる文字列または正規表現(JS)を入力'
      }
    ]
  },
  {
    command: 'create snapshot test file of react',
    script: Script.createSnapshottestFileOfReact,
    args: [
      {
        type: 'input',
        name: 'match',
        message:
          '対象となる JS or JSX ファイルのマッチ条件を文字列または正規表現(JS)で入力 (ex: React)'
      }
    ]
  },
  {
    command: 'replace element class Name',
    script: Script.replaceElementClassName,
    args: [
      {
        type: 'input',
        name: 'targetFile',
        message:
          'ターゲットとなる class 名を記した csv ファイルのファイルパスを入力'
      },
      {
        type: 'input',
        name: 'fileType',
        message: '置換の対象となるファイルの拡張を入力 (ex erb, js)'
      }
    ]
  }
];

(async (): Promise<void> => {
  const { COMMAND } = await askCommand();
  config.forEach((e, i) => {
    if (COMMAND === e.command) {
      const script = new Oneliner(config[i]);
      script.run();
    }
  });
})();

function askCommand(): Promise<inquirer.Answers> {
  const command = [
    {
      type: 'list',
      name: 'COMMAND',
      message: 'コマンドを選んでください',
      choices: config.map(e => e.command)
    }
  ];
  return inquirer.prompt(command);
}

function echo({ msg }: { msg: string }) {
  process.stdout.write(chalk.green(msg + '\n'));
}
