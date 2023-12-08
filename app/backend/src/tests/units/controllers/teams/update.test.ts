import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import { reqBodyUpdate200, serviceResponseUpdate200 } from '../../../mocks/teams.mock';
import TeamService from '../../../../services/TeamService'
import TeamController from '../../../../controllers/TeamController';
import { Request, Response } from 'express';


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