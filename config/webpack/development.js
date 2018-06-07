process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const config = environment.toWebpackConfig()
config.devtool = 'eval-source-map';
module.exports = config;
