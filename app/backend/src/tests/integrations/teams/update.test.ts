import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';
import SequelizeTeam from '../../../database/models/SequelizeTeam';
import { teams } from '../../mocks/teams.mock';

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