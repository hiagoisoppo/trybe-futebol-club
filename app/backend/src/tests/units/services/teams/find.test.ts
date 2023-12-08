import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from '../../../mocks/teams.mock';
import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';
import TeamService from '../../../../services/TeamService'
import CustomError from '../../../../utils/CustomError';

describe('Unit tests on TeamService find()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 with team data' , async function () {
    const mock = SequelizeTeam.build(teams[2]);
    sinon.stub(TeamModel.prototype, 'find').resolves(mock);

    const response = await service.find(3);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(200);
    chai.expect(response.data.id).to.equal(3);
    chai.expect(response.data.teamName).to.equal('New York Knicks');
  })

  it('Should return throw a CustomError with status 404 and a message "Team not found"' , async function () {
    sinon.stub(TeamModel.prototype, 'find').resolves(null);

    try {
      const response = await service.find(999);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Team not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })
})
