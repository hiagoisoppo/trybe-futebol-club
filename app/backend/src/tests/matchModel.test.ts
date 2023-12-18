import * as sinon from 'sinon';
import * as chai from 'chai';

import { matches, matchesWithTeams } from './mocks/match.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import MatchModel from '../models/MatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

describe('Unit tests on MatchModel create()', function () {
  const model = new MatchModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a new match data' , async function () {
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(SequelizeMatch, 'create').resolves(mock);

    const response = await model.create({
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });

    chai.expect(response).to.be.an('object');
    chai.expect(response.dataValues).to.have.keys(['id', 'homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
    chai.expect(response.dataValues).to.be.deep.equal(matches[0]);
  })
})

describe('Unit tests on MatchModel update()', function () {
  const model = new MatchModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a updated match data' , async function () {
    const mock = SequelizeMatch.build(matches[1]);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(mock);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const response = await model.update(1, { homeTeamGoals: 0, awayTeamGoals: 0 }) as SequelizeMatch;

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('dataValues');
    console.log(response.dataValues);
    chai.expect(response.dataValues).to.be.deep.equal(matches[1]);
  })

  it('Should return null' , async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    sinon.stub(SequelizeTeam, 'update').resolves([0]);

    const response = await model.update(999, { homeTeamGoals: 0, awayTeamGoals: 0 });

    chai.expect(response).to.be.null;
  })
})

describe('Unit tests on MatchModel list()', function () {
  const model = new MatchModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a array with 2 matches' , async function () {
    const mock = SequelizeMatch.bulkBuild(matchesWithTeams);
    sinon.stub(SequelizeMatch, 'findAll').resolves(mock);

    const response = await model.list();

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(2);
  })

  it('Should return a empty array' , async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves([]);

    const response = await model.list();

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(0);
  })
})

describe('Unit tests on MatchModel listInProgress()', function () {
  const model = new MatchModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a array with 1 match in progress' , async function () {
    const mock = SequelizeMatch.bulkBuild([matchesWithTeams[0]]);
    sinon.stub(SequelizeMatch, 'findAll').resolves(mock);

    const response = await model.listInProgress(true);

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(1);
  })

  it('Should return a empty array of matches in progress' , async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves([]);

    const response = await model.listInProgress(true);

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(0);
  })

  it('Should return a array with 1 match ended' , async function () {
    const mock = SequelizeMatch.bulkBuild([matchesWithTeams[1]]);
    sinon.stub(SequelizeMatch, 'findAll').resolves(mock);

    const response = await model.listInProgress(false);

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(1);
  })

  it('Should return a empty array of matches ended' , async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves([]);

    const response = await model.listInProgress(false);

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(0);
  })
})

describe('Unit tests on MatchModel finish()', function () {
  const model = new MatchModel();
  beforeEach(function () {sinon.restore(); });

  it('Should finish a match and return void' , async function () {
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const response = await model.finish(5);

    chai.expect(response).to.be.undefined;
  })
})

describe('Unit tests on MatchModel find()', function () {
  const model = new MatchModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a match data' , async function () {
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(mock);

    const response = await model.find(1);

    chai.expect(response).to.be.an('object');
    chai.expect(response?.dataValues).to.have.keys(['id', 'homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
    chai.expect(response?.dataValues).to.be.deep.equal(matches[0]);
  })

  it('Should return null' , async function () {
    sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

    const response = await model.find(999);

    chai.expect(response).to.be.null;
  })
})