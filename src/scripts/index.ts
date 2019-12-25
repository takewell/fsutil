import inquirer from 'inquirer';
import fsutil from '../lib/fsutil';

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
    fsutil.stdout(msg);
  },
  search: ({ target }: { target: string | RegExp }) => {
    const files = fsutil.filterFiles(target);
    for (const f of files) {
      fsutil.stdout(f);
    }
  },
  createSnapshottestFileOfReact: async ({
    match
  }: {
    match: string | RegExp;
  }) => {
    const files = fsutil.filterFiles(/(jsx$)/);
    for (const f of files) {
      const data = await fsutil.readf(f);
      if (f.match('.test.')) {
        continue;
      }

      if (data.match(match)) {
        const outputFilepath: string = f.replace(/(.*?)\.(jsx$)/, '$1.test.$2');
        const filename: string = fsutil.getFilename(f);
        const componentName: string = fsutil.pascalCase(
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
        await fsutil.writef(outputFilepath, outputData);
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
    const d: string = await fsutil.readf(fsutil.abpath(targetFile));
    const classList: string[] = d.split('\n,');
    const files = fsutil.filterFiles(fileType);
    for (const f of files) {
      let data = await fsutil.readf(f);
      for (const c of classList) {
        if (data.match(c)) {
          fsutil.stdout(f);
          data = data.replace(c, '');
          fsutil.writef(f, data);
        }
      }
    }
  },
  replaceCabab2camel: async ({
    target,
    output,
  }: {
    target: string,
    output: string,
  }) => {
    const files = fsutil.filterFiles(/\.jsx$/);
    const targetRegExp = new RegExp(target, 'mg');
    for (const f of files) {
      const data = await fsutil.readf(f);
      if(data.match(targetRegExp)) {
        data.replace(targetRegExp, '$1')
        const a = fsutil.pascalCase(RegExp.$1);
        const b = output.replace('$1', a);
        const c = data.replace(targetRegExp, b);
        await fsutil.writef(f, c);
      }
    }
  }
};
