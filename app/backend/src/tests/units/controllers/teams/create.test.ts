import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import { serviceResponseCreate201, reqBodyCreate201 } from '../../../mocks/teams.mock';
import TeamService from '../../../../services/TeamService'
import TeamController from '../../../../controllers/TeamController';
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