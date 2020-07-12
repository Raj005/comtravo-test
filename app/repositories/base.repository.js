class BaseRepository {
  constructor(api) {
    this.api = api;
  }

  async get(id) {
    return await this.api.get(id);
  }

  async find(queryObject) {
    return await this.api.find(queryObject);
  }
}

module.exports = BaseRepository;
