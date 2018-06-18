const path = require('path');
const { environment } = require('@rails/webpacker');
const typescript = require('./loaders/typescript');
const graphql = require('./loaders/graphql');
const less = require('./loaders/less');

environment.loaders.append('typescript', typescript);
environment.loaders.append('graphql', graphql);
environment.loaders.append('less', less);

environment.config.merge({
  plugins: [],
  resolve: {
    alias: {
      '../../theme.config': path.join(__dirname, '../../app/javascript/ifm-semantic-ui-theme/theme.config')
    }
  }
});

module.exports = environment
