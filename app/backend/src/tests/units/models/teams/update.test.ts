import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from '../../../mocks/teams.mock';
import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';

describe('Unit tests on TeamModel update()', function () {
  const model = new TeamModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a updated team data' , async function () {
    const mock = SequelizeTeam.build(teams[0]);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mock);
    sinon.stub(SequelizeTeam, 'update').resolves([1]);

    const response = await model.update(1, { teamName: 'Cleveland Cavaliers' }) as SequelizeTeam;

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('dataValues');
    chai.expect(response.dataValues.id).to.equal(1);
    chai.expect(response.dataValues.teamName).to.equal('Cleveland Cavaliers');
  })

  it('Should return null' , async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    sinon.stub(SequelizeTeam, 'update').resolves([0]);

    const response = await model.update(999, { teamName: 'Cleveland Cavaliers' });

    chai.expect(response).to.be.null;
  })
})