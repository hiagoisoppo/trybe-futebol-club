import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from '../../../mocks/teams.mock';
import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';
import TeamService from '../../../../services/TeamService'
import CustomError from '../../../../utils/CustomError';

describe('Unit tests on TeamService delete()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 204 with empty data' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(TeamModel.prototype, 'delete').resolves(8);
    sinon.stub(TeamModel.prototype, 'find').resolves(mock);

    const response = await service.delete(8);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(204);
    chai.expect(response.data).to.be.null;
  })

  it('Should return throw a CustomError with status 400 and a message "Non-existent id"' , async function () {
    sinon.stub(TeamModel.prototype, 'find').resolves(null);

    try {
      const response = await service.delete(999);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Non-existent id');
      chai.expect(error.statusCode).to.equal(400);
    }
  })
})
