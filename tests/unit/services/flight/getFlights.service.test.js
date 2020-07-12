const sinon = require('sinon');
const { expect, assert } = require('chai');

const getFlightsService = require('../../../../app/services/flight/getFlights.service');

describe('Flight services', () => {
  let flightRepository;

  const source1 = 'discovery-service-url/source1';
  const source2 = 'discovery-service-url/source2';

  let getFlights;

  before(async () => {
    const getAllFlightsStub = sinon.stub();

    getAllFlightsStub
      .withArgs({ url: source1 })
      .returns({ flights: [{ slices: [], price: 123 }] });

    getAllFlightsStub
      .withArgs({ url: source2 })
      .returns({ flights: [{ slices: [], price: 124 }] });

    getAllFlightsStub
      .withArgs({ url: 'throw' })
      .throwsException('discoveryAPIERR');

    flightRepository = {
      getAllFlights: getAllFlightsStub
    };

    getFlights = await getFlightsService({ flightRepository });
  });

  describe('getFlightsService', () => {
    it('should call getFlights only once and with correct arguments', async () => {
      const getFlightsSpy = sinon.spy(getFlights);
      await getFlightsSpy(source1);

      expect(getFlightsSpy.calledOnce).to.be.true;
      expect(getFlightsSpy.calledWith(source1)).to.be.true;
    });

    it('should return correct flights data with source 1', async () => {
      const flightsData = await getFlights(source1);

      assert.exists(flightsData);
      expect(flightsData).to.be.an('object');
      expect(flightsData).to.have.property('flights');
      expect(flightsData.flights).to.be.an('array');
      expect(flightsData.flights[0]).to.be.an('object');
      expect(flightsData.flights[0]).to.have.property('slices');
      expect(flightsData.flights[0]).to.have.property('price');
      expect(flightsData.flights[0].slices).to.be.an('array');
      expect(flightsData.flights[0].price).to.be.a('number');
      expect(flightsData.flights[0].price).to.equal(123);
    });

    it('should return correct flights data with source 2', async () => {
      const flightsData = await getFlights(source2);

      assert.exists(flightsData);
      expect(flightsData).to.be.an('object');
      expect(flightsData).to.have.property('flights');
      expect(flightsData.flights).to.be.an('array');
      expect(flightsData.flights[0]).to.be.an('object');
      expect(flightsData.flights[0]).to.have.property('slices');
      expect(flightsData.flights[0]).to.have.property('price');
      expect(flightsData.flights[0].slices).to.be.an('array');
      expect(flightsData.flights[0].price).to.be.a('number');
      expect(flightsData.flights[0].price).to.equal(124);
    });

    it('should return empty data in case of source failure', async () => {
      const flightsData = await getFlights('throw'); // mock source request to throw an exception

      assert.exists(flightsData);
      expect(flightsData).to.be.an('object');
      expect(flightsData).to.have.property('flights');
      expect(flightsData.flights).to.be.an('array');
      expect(flightsData.flights.length).to.equals(0);
    });
  });
});
