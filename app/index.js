const config = require('./config');

const initRoutes = require('./server/routes');
const initRepositories = require('./repositories');
const initServices = require('./services');
const initLibs = require('./libs');

const initApp = async () => {
  // DI container
  const DIContainer = {};
  DIContainer.config = config;

  const libs = initLibs(DIContainer);
  DIContainer.libs = libs;

  const repositories = initRepositories(DIContainer);
  DIContainer.repositories = repositories;

  const services = initServices(DIContainer);
  DIContainer.services = services;

  const routes = initRoutes(DIContainer);
  DIContainer.routes = routes;

  return DIContainer;
};

module.exports = initApp;
