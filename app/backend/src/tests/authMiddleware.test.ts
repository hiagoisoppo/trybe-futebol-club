import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import * as jwt from 'jsonwebtoken';
import { user1 } from './mocks/user.mock';
import TokenManager from '../utils/TokenManager';

chai.use(chaiHttp);

describe('Unit tests on AuthMiddleware()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return throw a CustomError with status 401 and a message "Token not found"' , async function () {
    const response = await chai.request(app).get('/login/role').send();

    chai.expect(response).to.have.status(401);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.be.equal('Token not found');
  })

  it('Should return throw a CustomError with status 401 and a message "Token not found"' , async function () {
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeUser, 'findByPk').resolves(null);
    
    const response = await chai.request(app).get('/login/role').set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo',
      ).send();

    chai.expect(response).to.have.status(401);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.be.equal('Token invalid');
  })

  it('Should return throw a CustomError with status 401 and a message "Token must be a valid token"' , async function () {
    sinon.stub(SequelizeUser, 'findByPk').resolves(null);
    
    const response = await chai.request(app).get('/login/role').set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo',
      ).send();

    chai.expect(response).to.have.status(401);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.be.equal('Token must be a valid token');
  })

  it('Should return throw a CustomError with status 401 and a message "Token invalid"' , async function () {
    sinon.stub(jwt, 'verify').resolves({username: user1.username, id: user1.id});
    sinon.stub(SequelizeUser, 'findByPk').resolves(null);
    
    const response = await chai.request(app).get('/login/role').set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo',
      ).send();
    
    chai.expect(response).to.have.status(401);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.be.equal('Token invalid');
  })
})