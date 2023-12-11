import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/team.mock';

chai.use(chaiHttp);

describe('Integration tests on the /teams route - POST create()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 201 and the new team data' , async function () {
    const body = { teamName: 'Milwaukee Bucks' };
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);
    sinon.stub(SequelizeTeam, 'create').resolves(mock);

    const response = await chai.request(app).post('/teams').send(body);

    chai.expect(response).to.have.status(201);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.keys(['id', 'teamName']);
    chai.expect(response.body.id).to.equal(8);
    chai.expect(response.body.teamName).to.equal('Milwaukee Bucks');
  })

  it('Should return status 400 and a message: "Team already exists"' , async function () {
    const body = { teamName: 'Toronto Raptors' };
    const mock = SequelizeTeam.build(teams[3]);
    sinon.stub(SequelizeTeam, 'findOne').resolves(mock);

    const response = await chai.request(app).post('/teams').send(body);

    chai.expect(response).to.have.status(400);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('Team already exists');
  })
})

describe('Integration tests on the /teams/:id route - DELETE delete()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 204 and a empty body' , async function () {
    sinon.stub(SequelizeTeam, 'destroy').resolves(5);

    const response = await chai.request(app).delete('/teams/5').send();

    chai.expect(response).to.have.status(204);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.be.empty;
  })

  it('Should return status 400 and a message: "Non-existent id"' , async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const response = await chai.request(app).delete('/teams/999').send();

    chai.expect(response).to.have.status(400);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('Non-existent id');
  })
})

describe('Integration tests on the /teams route - GET list()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a list with 10 teams' , async function () {
    const mock = SequelizeTeam.bulkBuild(teams);
    sinon.stub(SequelizeTeam, 'findAll').resolves(mock);

    const response = await chai.request(app).get('/teams').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('array');
    chai.expect(response.body).to.have.lengthOf(10);
    chai.expect(response.body[0].id).to.equal(1);
    chai.expect(response.body[0].teamName).to.equal('Cleveland Cavaliers');
    chai.expect(response.body[9].id).to.equal(10);
    chai.expect(response.body[9].teamName).to.equal('Atlanta Hawks');
  })

  it('Should return status 200 and a empty array' , async function () {
    const mock = SequelizeTeam.bulkBuild([]);
    sinon.stub(SequelizeTeam, 'findAll').resolves(mock);

    const response = await chai.request(app).get('/teams').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('array');
    chai.expect(response.body).to.have.lengthOf(0);
  })
})

describe('Integration tests on the /teams/:id route - PUT update()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and the updated team data' , async function () {
    const body = { teamName: 'Los Angeles Lakers' };
    const mock = SequelizeTeam.build(teams[8]);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mock);
    sinon.stub(SequelizeTeam, 'update').resolves([1]);

    const response = await chai.request(app).put('/teams/9').send(body);

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.keys(['id', 'teamName']);
    chai.expect(response.body.id).to.equal(9);
    chai.expect(response.body.teamName).to.equal('Los Angeles Lakers');
  })

  it('Should return status 500 and a message: "Internal server error"' , async function () {
    const body = { teamName: 'Chicago Bulls' };
    const mock = SequelizeTeam.build(teams[1]);
    sinon.stub(SequelizeTeam, 'findByPk')
      .onFirstCall().resolves(mock).resolves(null);
    sinon.stub(SequelizeTeam, 'update').resolves([1]);

    const response = await chai.request(app).put('/teams/2').send(body);

    chai.expect(response).to.have.status(500);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('Internal server error');
  })

  it('Should return status 404 and a message: "Team not found"' , async function () {
    const body = { teamName: 'Toronto Raptors' };
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const response = await chai.request(app).put('/teams/999').send(body);

    chai.expect(response).to.have.status(404);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('Team not found');
  })
})

describe('Integration tests on the /teams/:id route - GET find()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a team data' , async function () {
    const mock = SequelizeTeam.build(teams[4]);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mock);

    const response = await chai.request(app).get('/teams/5').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.keys(['id', 'teamName']);
    chai.expect(response.body.teamName).to.equal('Dallas Mavericks');
    chai.expect(response.body.id).to.equal(5);
  })

  it('Should return status 404 and a message: "Team not found"' , async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const response = await chai.request(app).get('/teams/999').send();

    chai.expect(response).to.have.status(404);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('Team not found');
  })
})