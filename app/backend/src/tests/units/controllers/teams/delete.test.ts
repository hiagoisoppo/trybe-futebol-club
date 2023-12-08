import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import { serviceResponseDelete204 } from '../../../mocks/teams.mock';
import TeamService from '../../../../services/TeamService'
import TeamController from '../../../../controllers/TeamController';
import { Request, Response } from 'express';


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