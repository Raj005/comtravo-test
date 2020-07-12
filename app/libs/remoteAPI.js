class RemoteAPI {
  constructor({ provider, config }) {
    this.provider = provider;
    this.config = config;
  }

  async find(queryObject) {
    try {
      const { url } = queryObject;

      const { data } = await this.provider.get(url);

      return data;
    } catch (error) {
      const err = new Error('discoveryAPIERR');
      err.code = 'discoveryAPIERR';
      err.name = 'discoveryAPIERR';
      throw err;
    }
  }
}

module.exports = RemoteAPI;
