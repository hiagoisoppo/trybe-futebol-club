import * as sinon from 'sinon';
import * as chai from 'chai';

import SequelizeMatch from '../database/models/SequelizeMatch';
import MatchModel from '../models/MatchModel';
import MatchService from '../services/MatchService';
import CustomError from '../utils/CustomError';
import { matches, mockCreateBody201, mockCreateBody404a,
  mockCreateBody404b, mockCreateBody422, mockResponseCreate201,
  mockResponseFind200, 
  mockResponseFinish200, 
  mockResponseUpdate200, 
  mockUpdateBody200} from './mocks/match.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/team.mock';
import TeamModel from '../models/TeamModel';

describe('Unit tests on MatchService create()', function () {
  const service = new MatchService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 201 and a new match data' , async function () {
    const mockMatch = SequelizeMatch.build(matches[0]);
    const mockTeam = SequelizeTeam.build(teams[0])
    const mockTeam2 = SequelizeTeam.build(teams[1])

    sinon.stub(MatchModel.prototype, 'create').resolves(mockMatch);
    sinon.stub(TeamModel.prototype, 'find').onFirstCall().resolves(mockTeam).onSecondCall().resolves(mockTeam2);

    const response = await service.create(mockCreateBody201);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(201);
    chai.expect(response.data).to.deep.equal(mockResponseCreate201.data);
  })

  it('Should return throw a CustomError with status 422 and a message "It is not possible to create a match with two equal teams"' , async function () {
    try {
      const response = await service.create(mockCreateBody422);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('It is not possible to create a match with two equal teams');
      chai.expect(error.statusCode).to.equal(422);
    }
  })

  it('Should return throw a CustomError with status 404 and a message "There is no team with such id!"' , async function () {
    const mock = SequelizeTeam.build(teams[0]);
    sinon.stub(TeamModel.prototype, 'find').onFirstCall().resolves(mock).onSecondCall().resolves(null);
    try {
      const response = await service.create(mockCreateBody404a);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('There is no team with such id!');
      chai.expect(error.statusCode).to.equal(404);
    }
  })

  it('Should return throw a CustomError with status 404 and a message "There is no team with such id!"' , async function () {
    const mock = SequelizeTeam.build(teams[0]);
    sinon.stub(TeamModel.prototype, 'find').onFirstCall().resolves(null).onSecondCall().resolves(mock);

    try {
      const response = await service.create(mockCreateBody404b);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('There is no team with such id!');
      chai.expect(error.statusCode).to.equal(404);
    }
  })
})

describe('Unit tests on MatchService find()', function () {
  const service = new MatchService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 and a match data' , async function () {
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(MatchModel.prototype, 'find').resolves(mock);

    const response = await service.find(1);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(mockResponseFind200.statusCode);
    chai.expect(response.data).to.deep.equal(mockResponseFind200.data);
  })

  it('Should return throw a CustomError with status 404 and a message "Match not found"' , async function () {
    sinon.stub(MatchModel.prototype, 'find').resolves(null);
    try {
      const response = await service.find(999);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Match not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })
})

describe('Unit tests on MatchService update()', function () {
  const service = new MatchService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 and a updated match data' , async function () {
    const mock = SequelizeMatch.build(matches[0]);
    const mockFind = SequelizeMatch.build(matches[0]);

    sinon.stub(MatchModel.prototype, 'update').resolves(mock);
    sinon.stub(MatchModel.prototype, 'find').resolves(mockFind);

    const response = await service.update(1, mockUpdateBody200);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(mockResponseUpdate200.statusCode);
    chai.expect(response.data).to.deep.equal(mockResponseUpdate200.data);
  })

  it('Should return throw a CustomError with status 404 and a message "Match not found"' , async function () {
    const mock = SequelizeMatch.build(matches[0]);

    sinon.stub(MatchModel.prototype, 'find').resolves(null);
    sinon.stub(MatchModel.prototype, 'update').resolves(mock);

    try {
      const response = await service.update(1, mockCreateBody404a);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Match not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })

  it('Should return throw a CustomError with status 404 and a message "Match not found"' , async function () {
    const mock = SequelizeMatch.build(matches[0]);
    const mockFind = SequelizeMatch.build(matches[0]);

    sinon.stub(MatchModel.prototype, 'update').resolves(null);
    sinon.stub(MatchModel.prototype, 'find').resolves(mockFind);

    try {
      const response = await service.update(1, mockCreateBody404b);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Match not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })
})

describe('Unit tests on MatchService finish()', function () {
  const service = new MatchService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 and a finish message data' , async function () {
    const mockFind = SequelizeMatch.build(matches[0]);
    sinon.stub(MatchModel.prototype, 'find').resolves(mockFind);

    const response = await service.finish(1);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(mockResponseFinish200.statusCode);
    chai.expect(response.data).to.deep.equal(mockResponseFinish200.data);
  })

  it('Should return throw a CustomError with status 404 and a message "Match not found"' , async function () {
    const mock = SequelizeMatch.build(matches[0]);

    sinon.stub(MatchModel.prototype, 'find').resolves(null);
    sinon.stub(MatchModel.prototype, 'update').resolves(mock);

    try {
      const response = await service.update(1, mockCreateBody404a);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Match not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })

  it('Should return throw a CustomError with status 404 and a message "Match not found"' , async function () {
    const mock = SequelizeMatch.build(matches[0]);
    const mockFind = SequelizeMatch.build(matches[0]);

    sinon.stub(MatchModel.prototype, 'update').resolves(null);
    sinon.stub(MatchModel.prototype, 'find').resolves(mockFind);

    try {
      const response = await service.update(1, mockCreateBody404b);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Match not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })
})