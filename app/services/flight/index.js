const getFlightsService = require('./getFlights.service');

const initFlightServices = ({ flightRepository, config }) => {
  return {
    getFlights: getFlightsService({ flightRepository, config })
    // other CRUD flight services can go here
  };
};

module.exports = initFlightServices;
