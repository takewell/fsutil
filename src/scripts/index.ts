import inquirer from 'inquirer';
import Lib from '../lib/index';
const l = new Lib();

interface interfaceConfig {
  command: string;
  script: Function;
  args: any;
}
export class Oneliner {
  command: string;
  script: Function;
  args: any;
  cwd: string = process.cwd();
  constructor(config: interfaceConfig) {
    this.command = config.command;
    this.script = config.script;
    this.args = config.args;
  }

  async run(): Promise<void> {
    this.script(await this.getOption(this.args));
  }

  private async getOption(args: any): Promise<inquirer.Answers> {
    return await inquirer.prompt(args);
  }
}

// to be state less class
export const Script = {
  echo: ({ msg }: { msg: string }) => {
    l.stdout(msg);
  },
  search: ({ target }: { target: string | RegExp }) => {
    const files = l.filterFiles(target);
    for (const f of files) {
      l.stdout(f);
    }
  },
  createSnapshottestFileOfReact: async ({
    match
  }: {
    match: string | RegExp;
  }) => {
    const files = l.filterFiles(/(jsx$)/);
    for (const f of files) {
      const data = await l.readf(f);
      if (f.match('.test.')) {
        continue;
      }

      if (data.match(match)) {
        const outputFilepath: string = f.replace(/(.*?)\.(jsx$)/, '$1.test.$2');
        const filename: string = l.getFilename(f);
        const componentName: string = l.pascalCase(
          filename.replace(/(.*?)\.(jsx$)/, '$1')
        );
        const outputData: string = `import React from 'react';
import ${componentName} from './${filename}';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const props = {};
  const tree = renderer.create(<${componentName} {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});`;
        await l.writef(outputFilepath, outputData);
      }
    }
  },
  // ただの grep sed できはするがインターフェース重視
  replaceElementClassName: async ({
    targetFile,
    fileType
  }: {
    targetFile: string;
    fileType: string;
  }) => {
    const d: string = await l.readf(l.abpath(targetFile));
    const classList: string[] = d.split('\n,');
    const files = l.filterFiles(fileType);
    for (const f of files) {
      let data = await l.readf(f);
      for (const c of classList) {
        if (data.match(c)) {
          l.stdout(f);
          data = data.replace(c, '');
          l.writef(f, data);
        }
      }
    }
  }
};
