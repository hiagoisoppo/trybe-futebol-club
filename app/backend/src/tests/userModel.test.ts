import * as sinon from 'sinon';
import * as chai from 'chai';

import SequelizeUser from '../database/models/SequelizeUser';
import UserModel from '../models/UserModel';
import { user1, user2 } from './mocks/user.mock';

describe('Unit test on UserModel find()', async function () {
  const model = new UserModel();
  beforeEach(function () { sinon.restore(); });

  it('', async function () {
    const mock = SequelizeUser.build(user1);
    sinon.stub(SequelizeUser, 'findByPk').resolves(mock);

    const response = await model.find(1);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('dataValues');
    chai.expect(response?.dataValues.id).to.equal(user1.id);
    chai.expect(response?.dataValues.username).to.equal(user1.username);
    chai.expect(response?.dataValues.role).to.equal(user1.role);
    chai.expect(response?.dataValues.email).to.equal(user1.email);
    chai.expect(response?.dataValues.password).to.equal(user1.password);
  })
})

describe('Unit test on UserModel findByEmail()', async function () {
  const model = new UserModel();
  beforeEach(function () { sinon.restore(); });

  it('', async function () {
    const mock = SequelizeUser.build(user2);
    sinon.stub(SequelizeUser, 'findOne').resolves(mock);

    const response = await model.findByEmail(user2.email);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('dataValues');
    chai.expect(response?.dataValues.id).to.equal(user2.id);
    chai.expect(response?.dataValues.username).to.equal(user2.username);
    chai.expect(response?.dataValues.role).to.equal(user2.role);
    chai.expect(response?.dataValues.email).to.equal(user2.email);
    chai.expect(response?.dataValues.password).to.equal(user2.password);
    
  })
})