const { environment } = require('@rails/webpacker');
const typescript = require('./loaders/typescript');
const graphql = require('./loaders/graphql');

environment.loaders.append('typescript', typescript);
environment.loaders.append('graphql', graphql);
module.exports = environment
