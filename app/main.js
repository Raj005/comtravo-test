const initApp = require('./index');
const AppServer = require('./server');

const startApp = async () => {
  try {
    const appModules = await initApp();
    const { config, routes } = appModules;

    const server = new AppServer(config, routes);

    await server.init();
    await server.start();
  } catch (error) {
    console.log(error);
  }
};

startApp();
