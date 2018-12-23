const Lib = require('../lib');
const lib = new Lib();

export const readFile = async (filepath: string): Promise<void> => {
  try {
    const file = await lib.readf(lib.abpath(filepath));
    process.stdout.write(file);
    return;
  } catch (err) {
    process.stdout.write(err + '\n');
    return;
  }
};

/**
 * React の Snapshot テストをつくる
 * 以下のように使うことを想定している
 * ex : find . | grep -E ".jsx$" | xargs -I {} ol {} c-btn
 */
export const createReactSnaptestFile = async (
  filepath: string,
  match: string
): Promise<void> => {
  try {
    const fullpath = lib.abpath(filepath);
    const filename = lib.filename(fullpath);
    let outputFilepath: string;
    let componentName: string;
    if (filename.match('.jsx')) {
      outputFilepath = fullpath.replace(/(.*?)\.jsx/, '$1.test.jsx');
      componentName = lib.pascalCase(filename).replace('.jsx', '');
    } else if (filename.match('.js')) {
      outputFilepath = fullpath.replace(/(.*?)\.js/, '$1.test.js');
      componentName = lib.pascalCase(filename).replace('.js', '');
    } else {
      process.stdout.write('not target file \n');
      return;
    }
    const data = `import React from 'react';
import ${componentName} from './${filename}';
import renderer from 'react-test-renderer';
        
it('renders correctly', () => {
  const props = {};
  const tree = renderer.create(<${componentName} {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});`;

    const file = await lib.readf(filepath);
    const isMatch = file.match(match);

    if (isMatch) {
      console.log(filename);
      await lib.writef(outputFilepath, data);
      return;
    } else {
      process.stdout.write('not matched\n');
    }
  } catch (err) {
    process.stdout.write(err + '\n');
    return;
  }
};
