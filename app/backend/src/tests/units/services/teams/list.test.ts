import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from '../../../mocks/teams.mock';
import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';
import TeamService from '../../../../services/TeamService'

describe('Unit tests on TeamService list()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 with array of teams' , async function () {
    const mock = SequelizeTeam.bulkBuild(teams);
    sinon.stub(TeamModel.prototype, 'list').resolves(mock);

    const response = await service.list();

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(200);
    chai.expect(response.data).to.be.an('array');
    chai.expect(response.data).to.have.lengthOf(10);
    chai.expect(response.data[0].teamName).to.equal(teams[0].teamName);
    chai.expect(response.data[9].teamName).to.equal(teams[9].teamName);
  })
})
