const express = require('express');

class AppServer {
  constructor(config, routes) {
    this.config = config;
    this.routes = routes;
    this.app = null;
  }

  async init() {
    const { apiSlug } = this.config;
    const router = express.Router();
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(`${apiSlug}`, this.routes(router));

    this.app = app;
  }

  async start() {
    if (!this.app) {
      throw new Error('please init the server first');
    }

    const { port } = this.config;

    await this.app.listen(port);
    console.log(`Server is listening on port : ${port}`);
  }
}

module.exports = AppServer;
