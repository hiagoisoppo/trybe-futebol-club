import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import { Request, Response } from 'express';
import { mockCreateBody201, mockList200, mockList200False, mockList200True, mockResponseCreate201, mockResponseFinish200, mockResponseUpdate200, mockUpdateBody200 } from './mocks/match.mock';


describe('Unit tests on MatchController create()', function () {
  const controller = new MatchController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 201 and body with new match data' , async function () {
    req.body = mockCreateBody201;
    sinon.stub( MatchService.prototype, 'create').resolves(mockResponseCreate201);

    await controller.create(req, res);

    chai.expect(res.status).to.have.been.calledWith(mockResponseCreate201.statusCode);
    chai.expect(res.json).to.have.been.calledWith(mockResponseCreate201.data);
  })
})

describe('Unit tests on MatchController update()', function () {
  const controller = new MatchController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 200 and body with updated match data' , async function () {
    req.body = mockUpdateBody200;
    req.params = { id: '6' };
    sinon.stub( MatchService.prototype, 'update').resolves(mockResponseUpdate200);

    await controller.update(req, res);

    chai.expect(res.status).to.have.been.calledWith(mockResponseUpdate200.statusCode);
    chai.expect(res.json).to.have.been.calledWith(mockResponseUpdate200.data);
  })
})

describe('Unit tests on MatchController list()', function () {
  const controller = new MatchController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 200 and body with array of all matches' , async function () {
    req.query = { inProgress: '' };
    sinon.stub( MatchService.prototype, 'list').resolves(mockList200);

    await controller.list(req, res);

    chai.expect(res.status).to.have.been.calledWith(mockList200.statusCode);
    chai.expect(res.json).to.have.been.calledWith(mockList200.data);
  })

  it('Should return a response with status 200 and body with array of all InProgress matches' , async function () {
    req.query = { inProgress: 'true' };
    sinon.stub( MatchService.prototype, 'list').resolves(mockList200True);

    await controller.list(req, res);

    chai.expect(res.status).to.have.been.calledWith(mockList200True.statusCode);
    chai.expect(res.json).to.have.been.calledWith(mockList200True.data);
  })

  it('Should return a response with status 200 and body with array of all not InProgress matches' , async function () {
    req.query = { inProgress: 'false' };
    sinon.stub( MatchService.prototype, 'list').resolves(mockList200False);

    await controller.list(req, res);

    chai.expect(res.status).to.have.been.calledWith(mockList200False.statusCode);
    chai.expect(res.json).to.have.been.calledWith(mockList200False.data);
  })
})

describe('Unit tests on MatchController finish()', function () {
  const controller = new MatchController();
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Should return a response with status 200 and body with finish message' , async function () {
    req.params = { id: '4' };
    sinon.stub( MatchService.prototype, 'finish').resolves(mockResponseFinish200);

    await controller.finish(req, res);

    chai.expect(res.status).to.have.been.calledWith(mockResponseFinish200.statusCode);
    chai.expect(res.json).to.have.been.calledWith(mockResponseFinish200.data);
  })
})
