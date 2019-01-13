import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import chalk from 'chalk';

export default class Lib {
  /**
   * `fs.readFile` と `encoding: 'utf8'`の Promise ラッパー
   * @method
   */
  async readf(filepath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      return fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }

  /**
   * `fs.writeFile`の Promise ラッパー
   * @method
   */
  async writef(filepath: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return fs.writeFile(filepath, data, err => {
        return err ? reject(err) : resolve();
      });
    });
  }

  /**
   * キャメルケースへ変換 sampleString
   * @method
   */
  camelCase(str: string): string {
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str.replace(/[-_](.)/g, (match, group1) => {
      return group1.toUpperCase();
    });
  }

  /**
   * スネークケースへ変換 sample_string
   * @method
   */
  snakeCase(str: string): string {
    const camel = this.camelCase(str);
    return camel.replace(/[A-Z]/g, s => {
      return '_' + s.charAt(0).toLowerCase();
    });
  }

  /**
   * パスカルケースへ変換 SampleString
   * @method
   */
  pascalCase(str: string): string {
    const camel = this.camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  }

  /**
   * filepath から filename を所得
   * @method
   */
  getFilename(filepath: string): string {
    return path.basename(this.abpath(filepath));
  }

  /**
   * filepath から filename を所得
   * @method
   */
  abpath(filepath: string): string {
    return path.resolve(process.cwd(), filepath);
  }

  filterFiles(match: string | RegExp): string[] {
    return this.getUnderlayerFiles().filter(f => f.match(match));
  }

  getUnderlayerFiles(): string[] {
    return shell.find(process.cwd());
  }

  stdout(msg: string | string[]): void {
    process.stdout.write(chalk.green(msg + '\n'));
  }

  grep(match: string | RegExp, file: string) {
    shell.grep(match, file);
  }
}
