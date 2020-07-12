const flight = require('./flight');

const initServices = ({ repositories, config }) => {
  const { flightRepository } = repositories;

  return {
    flightService: flight({ flightRepository, config })
  };
};

module.exports = initServices;
