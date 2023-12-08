import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';
import SequelizeTeam from '../../../database/models/SequelizeTeam';
import { teams } from '../../mocks/teams.mock';

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