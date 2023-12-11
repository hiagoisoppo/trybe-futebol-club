import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from './mocks/team.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import TeamModel from '../models/TeamModel';
import TeamService from '../services/TeamService'
import CustomError from '../utils/CustomError';

describe('Unit tests on TeamService create()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 201 and a new team data' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(TeamModel.prototype, 'create').resolves(mock);
    sinon.stub(TeamModel.prototype, 'findByName').resolves(null);

    const response = await service.create({ teamName: 'Milwaukee Bucks' });

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(201);
    chai.expect(response.data).to.equal(mock.dataValues);
  })

  it('Should return throw a CustomError with status 400 and a message "Team already exists"' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(TeamModel.prototype, 'findByName').resolves(mock);

    try {
      const response = await service.create({ teamName: 'Milwaukee Bucks' });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Team already exists');
      chai.expect(error.statusCode).to.equal(400);
    }
  })
})

describe('Unit tests on TeamService update()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 and a updated team data' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(TeamModel.prototype, 'create').resolves(mock);
    sinon.stub(TeamModel.prototype, 'find').resolves(mock);

    const response = await service.update(8, { teamName: 'Milwaukee Bucks' });

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(200);
    chai.expect(response.data.id).to.equal(mock.dataValues.id);
    chai.expect(response.data.teamName).to.equal(mock.dataValues.teamName);
  })

  it('Should return throw a CustomError with status 404 and a message "Team not found"' , async function () {
    sinon.stub(TeamModel.prototype, 'find').resolves(null);

    try {
      const response = await service.update(8, { teamName: 'Milwaukee Bucks' });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Team not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })
})

describe('Unit tests on TeamService list()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 with array of teams' , async function () {
    const mock = SequelizeTeam.bulkBuild(teams);
    sinon.stub(TeamModel.prototype, 'list').resolves(mock);

    const response = await service.list();

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(200);
    chai.expect(response.data).to.be.an('array');
    chai.expect(response.data).to.have.lengthOf(10);
    chai.expect(response.data[0].teamName).to.equal(teams[0].teamName);
    chai.expect(response.data[9].teamName).to.equal(teams[9].teamName);
  })
})

describe('Unit tests on TeamService find()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 with team data' , async function () {
    const mock = SequelizeTeam.build(teams[2]);
    sinon.stub(TeamModel.prototype, 'find').resolves(mock);

    const response = await service.find(3);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(200);
    chai.expect(response.data.id).to.equal(3);
    chai.expect(response.data.teamName).to.equal('New York Knicks');
  })

  it('Should return throw a CustomError with status 404 and a message "Team not found"' , async function () {
    sinon.stub(TeamModel.prototype, 'find').resolves(null);

    try {
      const response = await service.find(999);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Team not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })
})

describe('Unit tests on TeamService delete()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 204 with empty data' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(TeamModel.prototype, 'delete').resolves(8);
    sinon.stub(TeamModel.prototype, 'find').resolves(mock);

    const response = await service.delete(8);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(204);
    chai.expect(response.data).to.be.null;
  })

  it('Should return throw a CustomError with status 400 and a message "Non-existent id"' , async function () {
    sinon.stub(TeamModel.prototype, 'find').resolves(null);

    try {
      const response = await service.delete(999);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Non-existent id');
      chai.expect(error.statusCode).to.equal(400);
    }
  })
})
