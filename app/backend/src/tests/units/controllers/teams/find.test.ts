import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import { serviceResponseFind200, serviceResponseList200 } from '../../../mocks/teams.mock';
import TeamService from '../../../../services/TeamService'
import TeamController from '../../../../controllers/TeamController';
import { Request, Response } from 'express';


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