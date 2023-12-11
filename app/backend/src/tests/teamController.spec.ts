import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import { serviceResponseCreate201, reqBodyCreate201, reqBodyUpdate200, serviceResponseUpdate200, serviceResponseList200, serviceResponseFind200, serviceResponseDelete204 } from './mocks/team.mock';
import TeamService from '../services/TeamService'
import TeamController from '../controllers/TeamController';
import { Request, Response } from 'express';


describe('Unit tests on TeamController create()', function () {
  const controller = new TeamController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 201 and body with new team data' , async function () {
    req.body = reqBodyCreate201;
    sinon.stub( TeamService.prototype, 'create').resolves(serviceResponseCreate201);

    await controller.create(req, res);

    chai.expect(res.status).to.have.been.calledWith(201);
    chai.expect(res.json).to.have.been.calledWith(serviceResponseCreate201.data);
  })
})

describe('Unit tests on TeamController update()', function () {
  const controller = new TeamController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 200 and body with updated team data' , async function () {
    req.body = reqBodyUpdate200;
    req.params = { id: '6' };
    sinon.stub( TeamService.prototype, 'update').resolves(serviceResponseUpdate200);

    await controller.update(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith(serviceResponseUpdate200.data);
  })
})

describe('Unit tests on TeamController list()', function () {
  const controller = new TeamController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 200 and body with array of teams' , async function () {
    sinon.stub( TeamService.prototype, 'list').resolves(serviceResponseList200);

    await controller.list(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith(serviceResponseList200.data);
  })
})

describe('Unit tests on TeamController find()', function () {
  const controller = new TeamController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 200 and body with team data' , async function () {
    req.params = { id: '4' };
    sinon.stub( TeamService.prototype, 'find').resolves(serviceResponseFind200);

    await controller.find(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith(serviceResponseFind200.data);
  })
})

describe('Unit tests on TeamController delete()', function () {
  const controller = new TeamController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 204 and body with team data' , async function () {
    req.params = { id: '1' };
    sinon.stub( TeamService.prototype, 'delete').resolves(serviceResponseDelete204);

    await controller.delete(req, res);

    chai.expect(res.status).to.have.been.calledWith(204);
    chai.expect(res.json).to.have.been.calledWith();
  })
})