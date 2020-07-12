const BaseRepository = require('./base.repository');

class FlightRepository extends BaseRepository {
  constructor(api) {
    super(api);
  }
  async getAllFlights(queryObject) {
    return await super.find(queryObject);
  }
}

module.exports = FlightRepository;
