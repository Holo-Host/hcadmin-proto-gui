const babelJest = require('babel-jest');


// custom-transformer.js
'use strict';

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [jestPreset],
      });
    }
    return src;
  },
};
