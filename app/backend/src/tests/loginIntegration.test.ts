import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { user1 } from './mocks/user.mock';
import { login } from './mocks/login. mock';
import TokenManager from '../utils/TokenManager';

chai.use(chaiHttp);

describe('Integration tests on the /login route - POST login()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a token' , async function () {
    const mock = SequelizeUser.build(user1);
    sinon.stub(SequelizeUser, 'findOne').resolves(mock);

    const response = await chai.request(app).post('/login').send(login);

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('token');
    chai.expect(response.body.token).to.be.a('string');
  })

  it('Should return status 404 and a message: "Invalid email or password"' , async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(login);

    chai.expect(response).to.have.status(401);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.equal('Invalid email or password');
  })
})

describe('Integration tests on the /login/role route - GET getRole()', function () {
  beforeEach(function () { sinon.restore(); });

  it('Should return status 200 and a role' , async function () {
    const mock = SequelizeUser.build(user1);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeUser, 'findByPk').resolves(mock);

    const response = await chai.request(app).get('/login/role').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo').send();

    chai.expect(response).to.have.status(200);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('role');
    chai.expect(response.body.role).to.be.equal(user1.role);
  })

  it('Should return status 404 and a message: "User not found"' , async function () {
    const mock = SequelizeUser.build(user1);
    sinon.stub(TokenManager, 'validate').returns({username: user1.username, id: user1.id});
    sinon.stub(SequelizeUser, 'findByPk').onFirstCall().resolves(mock).onSecondCall().resolves(null);

    const response = await chai.request(app).get('/login/role').set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMjUwNjQ1NX0.VWt0_LNGLGZS8ambPdAL5ZSAfldfVrTB5F6VfSQzeCo',
      ).send();

    chai.expect(response).to.have.status(404);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.have.key('message');
    chai.expect(response.body.message).to.be.equal('User not found');
  })
})