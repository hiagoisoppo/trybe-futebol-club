import * as sinon from 'sinon';
import * as chai from 'chai';

import { teams } from '../../../mocks/teams.mock';
import SequelizeTeam from '../../../../database/models/SequelizeTeam';
import TeamModel from '../../../../models/TeamModel';
import TeamService from '../../../../services/TeamService'
import CustomError from '../../../../utils/CustomError';

describe('Unit tests on TeamService create()', function () {
  const service = new TeamService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 201 and a new team data' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(TeamModel.prototype, 'create').resolves(mock);
    sinon.stub(TeamModel.prototype, 'findByName').resolves(null);

    const response = await service.create({ teamName: 'Milwaukee Bucks' });

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(201);
    chai.expect(response.data).to.equal(mock.dataValues);
  })

  it('Should return throw a CustomError with status 400 and a message "Team already exists"' , async function () {
    const mock = SequelizeTeam.build(teams[7]);
    sinon.stub(TeamModel.prototype, 'findByName').resolves(mock);

    try {
      const response = await service.create({ teamName: 'Milwaukee Bucks' });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Team already exists');
      chai.expect(error.statusCode).to.equal(400);
    }
  })
})