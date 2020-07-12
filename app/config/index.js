const dev = require('./development.json');
const prod = require('./production.json');

const config = dev; // logic here to select the required config based on the env

module.exports = config;
