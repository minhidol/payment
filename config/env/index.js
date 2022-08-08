var path = require('path');

//const env = process.env.NODE_ENV || 'local';
const env = process.env.NODE_ENV || 'development';
//const env = process.env.NODE_ENV || 'staging';
//const env = process.env.NODE_ENV || 'production';
const config = require(`./${env}`); // eslint-disable-line import/no-dynamic-require

const defaults = {
  root: path.join(__dirname, '/..')
};

module.exports = {
  defaults,
  config
}
