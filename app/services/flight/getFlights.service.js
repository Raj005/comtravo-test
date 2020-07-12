module.exports = ({ flightRepository }) => async sourceURL => {
  try {
    const flightsData = await flightRepository.getAllFlights({
      url: sourceURL
    });

    return flightsData;
  } catch (error) {
    // Simplest solution for now
    // send empty data in case of any error from discovery service endpoints
    if (
      error.code === 'discoveryAPIERR' ||
      error.name === 'discoveryAPIERR' ||
      error.message === 'discoveryAPIERR'
    ) {
      return { flights: [] };
    }
  }
};
