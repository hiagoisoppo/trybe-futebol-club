import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import { serviceResponseList200 } from '../../../mocks/teams.mock';
import TeamService from '../../../../services/TeamService'
import TeamController from '../../../../controllers/TeamController';
import { Request, Response } from 'express';


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