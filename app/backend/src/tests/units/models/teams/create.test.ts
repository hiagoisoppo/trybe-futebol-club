import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from '../../../mocks/teams.mock';
import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';

describe('Unit tests on TeamModel create()', function () {
  const model = new TeamModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a new team data' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(SequelizeTeam, 'create').resolves(mock);

    const response = await model.create({ teamName: 'Milwaukee Bucks' });

    chai.expect(response).to.be.an('object');
    chai.expect(response.dataValues).to.have.keys(['id', 'teamName']);
    chai.expect(response.id).to.equal(8);
    chai.expect(response.teamName).to.equal('Milwaukee Bucks');
  })
})