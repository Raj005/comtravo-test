const initFlightRouter = require('./flight');

module.exports = ({ services, config }) => router => {
  initFlightRouter(router, services, config);
  // other entity routes can go here

  return router;
};
