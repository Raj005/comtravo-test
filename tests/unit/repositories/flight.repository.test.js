const sinon = require('sinon');
const { expect, assert } = require('chai');

const FlightRepository = require('../../../app/repositories/flight.repository');

describe('Flight Repository', () => {
  let flightRepository;
  let api;

  before(() => {
    api = {
      find: sinon.stub().returns({ flights: [{ slices: [], price: 123 }] })
    };
    flightRepository = new FlightRepository(api);
  });

  it('should have a getAllFlights method in the repository', () => {
    assert.exists(flightRepository.getAllFlights);
    expect(flightRepository.getAllFlights).to.be.a('function');
  });

  it('should call getAllFlights method only once and with correct arguments', async () => {
    const flightRepositoryMock = sinon.mock(flightRepository);
    const getAllFlights = flightRepositoryMock.expects('getAllFlights');

    await getAllFlights({});

    expect(getAllFlights.calledOnce).to.be.true;
    expect(getAllFlights.calledWith({})).to.be.true;
    flightRepositoryMock.restore();
  });

  it('should return correct flights data when calling getAllFlights method', async () => {
    const flightsData = await flightRepository.getAllFlights({});

    assert.exists(flightsData);
    expect(flightsData).to.be.an('object');
    expect(flightsData).to.have.property('flights');
    expect(flightsData.flights).to.be.an('array');
    expect(flightsData.flights[0]).to.be.an('object');
    expect(flightsData.flights[0]).to.have.property('slices');
    expect(flightsData.flights[0]).to.have.property('price');
    expect(flightsData.flights[0].slices).to.be.an('array');
    expect(flightsData.flights[0].price).to.be.a('number');
  });
});
