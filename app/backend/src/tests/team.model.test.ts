import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from './mocks/team.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import TeamModel from '../models/TeamModel';

describe('Unit tests on TeamModel create()', function () {
  const model = new TeamModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a new team data' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(SequelizeTeam, 'create').resolves(mock);

    const response = await model.create({ teamName: 'Milwaukee Bucks' });

    chai.expect(response).to.be.an('object');
    chai.expect(response.dataValues).to.have.keys(['id', 'teamName']);
    chai.expect(response.id).to.equal(8);
    chai.expect(response.teamName).to.equal('Milwaukee Bucks');
  })
})

describe('Unit tests on TeamModel update()', function () {
  const model = new TeamModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a updated team data' , async function () {
    const mock = SequelizeTeam.build(teams[0]);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mock);
    sinon.stub(SequelizeTeam, 'update').resolves([1]);

    const response = await model.update(1, { teamName: 'Cleveland Cavaliers' }) as SequelizeTeam;

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('dataValues');
    chai.expect(response.dataValues.id).to.equal(1);
    chai.expect(response.dataValues.teamName).to.equal('Cleveland Cavaliers');
  })

  it('Should return null' , async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    sinon.stub(SequelizeTeam, 'update').resolves([0]);

    const response = await model.update(999, { teamName: 'Cleveland Cavaliers' });

    chai.expect(response).to.be.null;
  })
})

describe('Unit tests on TeamModel list()', function () {
  const model = new TeamModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a array with 10 teams' , async function () {
    const mock = SequelizeTeam.bulkBuild(teams);
    sinon.stub(SequelizeTeam, 'findAll').resolves(mock);

    const response = await model.list();

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(10);
    chai.expect(response[0].id).to.equal(1);
    chai.expect(response[0].teamName).to.equal('Cleveland Cavaliers');
    chai.expect(response[9].id).to.equal(10);
    chai.expect(response[9].teamName).to.equal('Atlanta Hawks');
  })

  it('Should return a empty array' , async function () {
    const mock = SequelizeTeam.bulkBuild([]);
    sinon.stub(SequelizeTeam, 'findAll').resolves(mock);

    const response = await model.list();

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(0);
  })
})

describe('Unit tests on TeamModel find()', function () {
  const model = new TeamModel();
  beforeEach(function () { sinon.restore(); });

  it('Should return a team data' , async function () {
    const mock = SequelizeTeam.build(teams[4]);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mock);

    const response = await model.find(5) as SequelizeTeam;

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('dataValues');
    chai.expect(response.dataValues).to.have.keys(['id', 'teamName']);
    chai.expect(response.dataValues.teamName).to.equal('Dallas Mavericks');
    chai.expect(response.dataValues.id).to.equal(5);
  })

  it('Should return null' , async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const response = await model.find(999);

    chai.expect(response).to.be.null;
  })
})

describe('Unit tests on TeamModel delete()', function () {
  const model = new TeamModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a id from deleted team' , async function () {
    sinon.stub(SequelizeTeam, 'destroy').resolves(5);

    const response = await model.delete(5);

    chai.expect(response).to.be.an('number');
    chai.expect(response).to.be.equal(5);
  })
})