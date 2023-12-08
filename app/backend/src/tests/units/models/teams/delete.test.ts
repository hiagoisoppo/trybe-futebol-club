import * as sinon from 'sinon';
import * as chai from 'chai';

import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';

describe('Unit tests on TeamModel delete()', function () {
  const model = new TeamModel();
  beforeEach(function () {sinon.restore(); });

  it('Should return a id from deleted team' , async function () {
    sinon.stub(SequelizeTeam, 'destroy').resolves(5);

    const response = await model.delete(5);

    chai.expect(response).to.be.an('number');
    chai.expect(response).to.be.equal(5);
  })
})