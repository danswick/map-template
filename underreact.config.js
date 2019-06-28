'use strict';

const html = require('./html');
const path = require('path');

module.exports = {
  outputDirectory: path.join(__dirname, '/docs'),
  htmlSource: html()
};