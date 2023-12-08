import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';
import SequelizeTeam from '../../../database/models/SequelizeTeam';
import { teams } from '../../mocks/teams.mock';

chai.use(chaiHttp);

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