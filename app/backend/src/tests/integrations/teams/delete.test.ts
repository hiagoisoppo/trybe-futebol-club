import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';
import SequelizeTeam from '../../../database/models/SequelizeTeam';

chai.use(chaiHttp);

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