const RemoteAPI = require('./remoteAPI');
const axios = require('axios');

module.exports = ({ config }) => {
  const { auth, timeout } = config.discoveryService;

  const provider = axios.create({ auth, timeout });

  const api = new RemoteAPI({ provider, config });

  return { api };
};
