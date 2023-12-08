import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from '../../../mocks/teams.mock';
import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';

describe('Unit tests on TeamModel list()', function () {
  const model = new TeamModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a array with 10 teams' , async function () {
    const mock = SequelizeTeam.bulkBuild(teams);
    sinon.stub(SequelizeTeam, 'findAll').resolves(mock);

    const response = await model.list();

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(10);
    chai.expect(response[0].id).to.equal(1);
    chai.expect(response[0].teamName).to.equal('Cleveland Cavaliers');
    chai.expect(response[9].id).to.equal(10);
    chai.expect(response[9].teamName).to.equal('Atlanta Hawks');
  })

  it('Should return a empty array' , async function () {
    const mock = SequelizeTeam.bulkBuild([]);
    sinon.stub(SequelizeTeam, 'findAll').resolves(mock);

    const response = await model.list();

    chai.expect(response).to.be.an('array');
    chai.expect(response).to.have.lengthOf(0);
  })
})