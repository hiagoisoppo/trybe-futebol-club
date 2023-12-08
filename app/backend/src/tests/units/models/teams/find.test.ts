import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from '../../../mocks/teams.mock';
import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';

describe('Unit tests on TeamModel find()', function () {
  const model = new TeamModel();
  beforeEach(function () { sinon.restore(); });

  it('Should return a team data' , async function () {
    const mock = SequelizeTeam.build(teams[4]);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mock);

    const response = await model.find(5) as SequelizeTeam;

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('dataValues');
    chai.expect(response.dataValues).to.have.keys(['id', 'teamName']);
    chai.expect(response.dataValues.teamName).to.equal('Dallas Mavericks');
    chai.expect(response.dataValues.id).to.equal(5);
  })

  it('Should return null' , async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const response = await model.find(999);

    chai.expect(response).to.be.null;
  })
})