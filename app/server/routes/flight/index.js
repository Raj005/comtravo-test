// all flight level routes here
const getRouteHandler = require('./get');

module.exports = (router, services, config) => {
  // http verbs
  router.get('/flights', getRouteHandler(services, config));
};
