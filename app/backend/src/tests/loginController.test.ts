import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
import { Request, Response } from 'express';
import { login, serviceResponseGetRole200, serviceResponseLogin200 } from './mocks/login. mock';
import AuthRequest from '../Interfaces/AuthRequest';
import { user1 } from './mocks/user.mock';


describe('Unit tests on LoginController login()', function () {
  const controller = new LoginController();
  const req = {} as Request;
  const res = {} as Response;
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 200 and body with a token' , async function () {
    req.body = login;
    sinon.stub(LoginService.prototype, 'login').resolves(serviceResponseLogin200);

    await controller.login(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith(serviceResponseLogin200.data);
  })
})

describe('Unit tests on LoginController getRole()', function () {
  const controller = new LoginController();
  const req = {} as AuthRequest;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 200 and body with team data' , async function () {
    req.user = {
      username: user1.username,
      id: user1.id,
    };
    sinon.stub( LoginService.prototype, 'getRole').resolves(serviceResponseGetRole200);

    await controller.getRole(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith(serviceResponseGetRole200.data);
  })
})
