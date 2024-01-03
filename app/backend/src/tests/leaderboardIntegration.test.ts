import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { teamsStats } from './mocks/match.mock';

chai.use(chaiHttp);

describe('Integration tests on the /leaderboard route - GET list()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a list with all teams status in correct order' , async function () {
    sinon.stub(SequelizeMatch, 'sequelize').resolves(teamsStats);

    const response = await chai.request(app).get('/leaderboard').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('array');
    chai.expect(response.body).to.have.lengthOf(16);
  })
})

describe('Integration tests on the /leaderboard/home route - GET listHome()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a list with all home teams status in correct order' , async function () {
    sinon.stub(SequelizeMatch, 'sequelize').resolves(teamsStats);

    const response = await chai.request(app).get('/leaderboard/home').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('array');
    chai.expect(response.body).to.have.lengthOf(16);
  })
})

describe('Integration tests on the /leaderboard/away route - GET listAway()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a list with all away teams status in correct order' , async function () {
    sinon.stub(SequelizeMatch, 'sequelize').resolves(teamsStats);

    const response = await chai.request(app).get('/leaderboard/away').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('array');
    chai.expect(response.body).to.have.lengthOf(16);
  })
})
