import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';
import SequelizeTeam from '../../../database/models/SequelizeTeam';
import { teams } from '../../mocks/teams.mock';

chai.use(chaiHttp);

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