import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matches, mockCreateBody201, mockCreateBody404a, mockCreateBody404b, mockCreateBody422, mockList200False, mockList200True } from './mocks/match.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/team.mock';
import TokenManager from '../utils/TokenManager';
import { user1 } from './mocks/user.mock';

chai.use(chaiHttp);

describe('Integration tests on the /matches route - POST create()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 201 and the new match data' , async function () {
    const body = mockCreateBody201;
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeMatch, 'findByPk').onFirstCall().resolves(null).onSecondCall().resolves(null);
    sinon.stub(SequelizeMatch, 'create').resolves(mock);

    const response = await chai.request(app).post('/matches').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send(body);

    chai.expect(response).to.have.status(201);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.keys(['id', 'homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
    chai.expect(response.body).to.be.deep.equal(body);
  })

  it('Should return status 422 and a message: "It is not possible to create a match with two equal teams"' , async function () {
    const body = mockCreateBody422;
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});

    const response = await chai.request(app).post('/matches').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send(body);

    chai.expect(response).to.have.status(422);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('It is not possible to create a match with two equal teams');
  })

  it('Should return status 404 and a message: "There is no team with such id!"' , async function () {
    const body = mockCreateBody404a;
    const mock = SequelizeTeam.build(teams[0]);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeTeam, 'findByPk').onFirstCall().resolves(null).onSecondCall().resolves(mock);

    const response = await chai.request(app).post('/matches').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send(body);

    chai.expect(response).to.have.status(404);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('There is no team with such id!');
  })

  it('Should return status 404 and a message: "There is no team with such id!"' , async function () {
    const body = mockCreateBody404b;
    const mock = SequelizeTeam.build(teams[0]);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeTeam, 'findByPk').onFirstCall().resolves(mock).onSecondCall().resolves(null);

    const response = await chai.request(app).post('/matches').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send(body);

    chai.expect(response).to.have.status(404);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('There is no team with such id!');
  })
})

describe('Integration tests on the /matches/:id/finish route - PATCH finish()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a message: "Finished"' , async function () {
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeMatch, 'findByPk').resolves(mock);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const response = await chai.request(app).patch('/matches/1/finish').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.be.deep.equal('Finished');
  })

  it('Should return status 404 and a message: "Match not found"' , async function () {
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

    const response = await chai.request(app).patch('/matches/1/finish').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send();

    chai.expect(response).to.have.status(404);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('Match not found');
  })
})

describe('Integration tests on the /matches route - GET list()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a list with all matches' , async function () {
    const mock = SequelizeMatch.bulkBuild(matches);
    sinon.stub(SequelizeMatch, 'findAll').resolves(mock);

    const response = await chai.request(app).get('/matches').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('array');
    chai.expect(response.body).to.have.lengthOf(2);
    chai.expect(response.body[0].id).to.equal(1);
    chai.expect(response.body[0]).to.have.keys(['id', 'homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
    chai.expect(response.body[1].id).to.equal(2);
    chai.expect(response.body[0]).to.have.keys(['id', 'homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
  })

  it('Should return status 200 and a list with all matches in progress' , async function () {
    const mock = SequelizeMatch.bulkBuild(mockList200True.data);
    sinon.stub(SequelizeMatch, 'findAll').resolves(mock);

    const response = await chai.request(app).get('/matches').query({ inProgress: 'true' }).send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('array');
    chai.expect(response.body).to.have.lengthOf(1);
    chai.expect(response.body[0].id).to.equal(1);
    chai.expect(response.body[0]).to.have.keys(['id', 'homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
    chai.expect(response.body[0].inProgress).to.be.true;
  })

  it('Should return status 200 and a list with all matches not in progress' , async function () {
    const mock = SequelizeMatch.bulkBuild(mockList200False.data);
    sinon.stub(SequelizeMatch, 'findAll').resolves(mock);

    const response = await chai.request(app).get('/matches').query({ inProgress: 'false' }).send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('array');
    chai.expect(response.body).to.have.lengthOf(1);
    chai.expect(response.body[0].id).to.equal(2);
    chai.expect(response.body[0]).to.have.keys(['id', 'homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
    chai.expect(response.body[0].inProgress).to.be.false;
  })
})

describe('Integration tests on the /matches/:id route - PATCH update()', function () {
  beforeEach(function () { sinon.restore(); });

  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a updated match data' , async function () {
    const body = { homeTeamGoals: 0, awayTeamGoals: 0 };
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeMatch, 'findByPk').onFirstCall().resolves(mock).onSecondCall().resolves(mock);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const response = await chai.request(app).patch('/matches/1').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send(body);

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.keys(['id', 'homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
    chai.expect(response.body).to.be.deep.equal(matches[0]);
  })

  it('Should return status 404 and a message: "Match not found"' , async function () {
    const body = { homeTeamGoals: 0, awayTeamGoals: 0 };
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeMatch, 'findByPk').onFirstCall().resolves(null).onSecondCall().resolves(mock);

    const response = await chai.request(app).patch('/matches/1').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send(body);

    chai.expect(response).to.have.status(404);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.be.deep.equal('Match not found');
  })

  it('Should return status 404 and a message: "Match not found"' , async function () {
    const body = { homeTeamGoals: 0, awayTeamGoals: 0 };
    const mock = SequelizeMatch.build(matches[0]);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeMatch, 'findByPk').onFirstCall().resolves(mock).onSecondCall().resolves(null);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const response = await chai.request(app).patch('/matches/1').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send(body);

    chai.expect(response).to.have.status(404);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.be.deep.equal('Match not found');
  })
})