const sinon = require('sinon');
const { expect, assert } = require('chai');

const mockFlightsData1 = require('../../mock-data/flightsSource1.json');
const mockFlightsData2 = require('../../mock-data/flightsSource2.json');
const initGetFlightsRoute = require('../../../app/server/routes/flight/get');
const getFlightsService = require('../../../app/services/flight/getFlights.service');

describe('Flight API', () => {
  describe('GET /api/v1/flights', () => {
    let request = {};
    let response;
    let flightService;
    let config;
    const source1 = 'discovery-service-url/source1';
    const source2 = 'discovery-service-url/source2';

    before(() => {
      config = { discoveryService: { source1, source2 } };

      response = {
        json: args => args,
        status: status => data => {
          return {
            statusCode: status,
            headers: {
              'content-type': 'application/json'
            },
            ...data
          };
        }
      };
    });

    it('should return flights with source 1 and source 2', async () => {
      const getFlights = sinon.stub();

      getFlights.withArgs(source1).returns(mockFlightsData1);
      getFlights.withArgs(source2).returns(mockFlightsData2);

      flightService = {
        getFlights
      };

      const getFlightsRoute = initGetFlightsRoute({ flightService }, config);

      const flightsData = await getFlightsRoute(request, response);

      assert.exists(flightsData);
      expect(flightsData).to.be.an('object');
      expect(flightsData).to.have.property('flights');
      expect(flightsData.flights).to.be.an('array');
      expect(flightsData.flights[0]).to.be.an('object');
      expect(flightsData.flights[0]).to.have.property('slices');
      expect(flightsData.flights[0]).to.have.property('price');
      expect(flightsData.flights[0].slices).to.be.an('array');
      expect(flightsData.flights[0].price).to.be.a('number');
      expect(flightsData.flights.length).to.equal(
        mockFlightsData1.flights.length + mockFlightsData2.flights.length
      );
    });

    it('should return flights data without duplicates', async () => {
      const getFlights = sinon.stub();

      getFlights.withArgs(source1).returns(mockFlightsData1);
      getFlights.withArgs(source2).returns(mockFlightsData1); // returning same data from source2

      flightService = {
        getFlights
      };

      const getFlightsRoute = initGetFlightsRoute({ flightService }, config);

      const flightsData = await getFlightsRoute(request, response);

      assert.exists(flightsData);
      expect(flightsData).to.be.an('object');
      expect(flightsData).to.have.property('flights');
      expect(flightsData.flights).to.be.an('array');
      expect(flightsData.flights[0]).to.be.an('object');
      expect(flightsData.flights[0]).to.have.property('slices');
      expect(flightsData.flights[0]).to.have.property('price');
      expect(flightsData.flights[0].slices).to.be.an('array');
      expect(flightsData.flights[0].price).to.be.a('number');
      expect(flightsData.flights.length).to.equal(
        mockFlightsData1.flights.length
      );
    });

    it('should return flights from source1 if source2 fails', async () => {
      const getAllFlightsStub = sinon.stub();

      getAllFlightsStub.withArgs({ url: source1 }).returns(mockFlightsData1);

      getAllFlightsStub
        .withArgs({ url: source2 })
        .throwsException('discoveryAPIERR');

      flightRepository = {
        getAllFlights: getAllFlightsStub
      };

      getFlights = await getFlightsService({ flightRepository });

      flightService = {
        getFlights
      };

      const getFlightsRoute = initGetFlightsRoute({ flightService }, config);

      const flightsData = await getFlightsRoute(request, response);

      assert.exists(flightsData);
      expect(flightsData).to.be.an('object');
      expect(flightsData).to.have.property('flights');
      expect(flightsData.flights).to.be.an('array');
      expect(flightsData.flights[0]).to.be.an('object');
      expect(flightsData.flights[0]).to.have.property('slices');
      expect(flightsData.flights[0]).to.have.property('price');
      expect(flightsData.flights[0].slices).to.be.an('array');
      expect(flightsData.flights[0].price).to.be.a('number');
      expect(flightsData.flights.length).to.equal(
        mockFlightsData1.flights.length
      );
    });

    it('should return flights from source2 if source1 fails', async () => {
      const getAllFlightsStub = sinon.stub();

      getAllFlightsStub
        .withArgs({ url: source1 })
        .throwsException('discoveryAPIERR');

      getAllFlightsStub.withArgs({ url: source2 }).returns(mockFlightsData2);

      flightRepository = {
        getAllFlights: getAllFlightsStub
      };

      getFlights = await getFlightsService({ flightRepository });

      flightService = {
        getFlights
      };

      const getFlightsRoute = initGetFlightsRoute({ flightService }, config);

      const flightsData = await getFlightsRoute(request, response);

      assert.exists(flightsData);
      expect(flightsData).to.be.an('object');
      expect(flightsData).to.have.property('flights');
      expect(flightsData.flights).to.be.an('array');
      expect(flightsData.flights[0]).to.be.an('object');
      expect(flightsData.flights[0]).to.have.property('slices');
      expect(flightsData.flights[0]).to.have.property('price');
      expect(flightsData.flights[0].slices).to.be.an('array');
      expect(flightsData.flights[0].price).to.be.a('number');
      expect(flightsData.flights.length).to.equal(
        mockFlightsData2.flights.length
      );
    });

    it('should return empty flights data if both sources fail', async () => {
      const getAllFlightsStub = sinon.stub();

      getAllFlightsStub
        .withArgs({ url: source1 })
        .throwsException('discoveryAPIERR');

      getAllFlightsStub
        .withArgs({ url: source2 })
        .throwsException('discoveryAPIERR');

      flightRepository = {
        getAllFlights: getAllFlightsStub
      };

      getFlights = await getFlightsService({ flightRepository });

      flightService = {
        getFlights
      };

      const getFlightsRoute = initGetFlightsRoute({ flightService }, config);

      const flightsData = await getFlightsRoute(request, response);

      assert.exists(flightsData);
      expect(flightsData).to.be.an('object');
      expect(flightsData).to.have.property('flights');
      expect(flightsData.flights).to.be.an('array');
      expect(flightsData.flights.length).to.equals(0);
    });
  });
});
