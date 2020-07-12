const FlightRepository = require('./flight.repository');

const initRepositories = ({ libs }) => {
  const { api } = libs;
  const flightRepository = new FlightRepository(api);

  return {
    flightRepository
  };
};

module.exports = initRepositories;
