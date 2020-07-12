module.exports = ({ flightService }, config) => async (req, res) => {
  try {
    const { discoveryService } = config;
    const { source1, source2 } = discoveryService;

    const { flights: flights1 } = await flightService.getFlights(source1);
    const { flights: flights2 } = await flightService.getFlights(source2);

    const allFlights = [...flights1, ...flights2];

    const flightsMap = {};

    allFlights.forEach(flight => {
      const { slices } = flight;
      const flightId = [];

      slices.forEach(slice => {
        const {
          origin_name: origin,
          destination_name: destination,
          departure_date_time_utc: departureTime,
          flight_number: flightNum
        } = slice;

        const sliceId = `${origin}-${destination}-${new Date(
          departureTime
        ).getTime()}-${flightNum}`;

        flightId.push(sliceId);
      });

      flightsMap[flightId.join('-')] = flight;
    });

    const allFlightsWithoutDuplicates = Object.values(flightsMap);

    return res.json({ flights: allFlightsWithoutDuplicates });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
};
