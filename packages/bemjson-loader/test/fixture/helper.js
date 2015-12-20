const debug = require('debug')('loader');
const path = require('path');
const vm = require('vm');

const MemoryFileSystem = require('memory-fs');
const Webpack = require('webpack');

/**
 * @param  {object} config
 * @return {promise}
 */
function compile(config) {
  return new Promise((resolve, reject) => {
    const fs = new MemoryFileSystem();
    const compiler = new Webpack(config);

    compiler.outputFileSystem = fs;
    compiler.run((er, stats) => {
      if (er) {
        return void reject(er);
      }

      debug(`time ${stats.endTime - stats.startTime}ms`);

      fs.readFile(config.destination, 'utf8', (err, result) => {
        if (!err) {
          return void resolve(result);
        }

        if (err.code === 'ENOENT') {
          const file = path.relative(process.cwd(), config.destination);
          const storage = JSON.stringify(fs.meta(process.cwd()), null, 2);

          return void reject(new Error(`no such file ${file}\nin the virtual storage: ${storage}`));
        }

        reject(err);
      });
    });
  });
};

/**
 * @param  {object} config
 * @return {promise}
 */
function convert(config) {
  return compile(config)
    .then(code => {
      const ctx = vm.createContext({module: module});
      return vm.runInContext(code, ctx);
    });
}

exports.compile = compile;
exports.convert = convert;
