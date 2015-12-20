const debug = require('debug')('loader');
const path = require('path');

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

exports.compile = compile;
