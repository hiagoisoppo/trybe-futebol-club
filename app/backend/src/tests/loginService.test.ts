import * as sinon from 'sinon';
import * as chai from 'chai';

import SequelizeUser from '../database/models/SequelizeUser';
import UserModel from '../models/UserModel';
import LoginService from '../services/LoginService';
import CustomError from '../utils/CustomError';
import { user1 } from './mocks/user.mock';
import { login } from './mocks/login. mock';

describe('Unit tests on LoginService login()', function () {
  const service = new LoginService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 and a new token' , async function () {
    const mock = SequelizeUser.build(user1)
    sinon.stub(UserModel.prototype, 'findByEmail').resolves(mock);

    const response = await service.login(login);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(200);
    chai.expect(response.data).to.have.key('token');
  })

  it('Should return throw a CustomError with status 400 and a message "All fields must be filled"' , async function () {
    try {
      await service.login({ email: '', password: login.password });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('All fields must be filled');
      chai.expect(error.statusCode).to.equal(400);
    }
  })

  it('Should return throw a CustomError with status 400 and a message "All fields must be filled"' , async function () {
    try {
      await service.login({ email: login.email , password: '' });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('All fields must be filled');
      chai.expect(error.statusCode).to.equal(400);
    }
  })

  it('Should return throw a CustomError with status 401 and a message "Invalid email or password"' , async function () {
    try {
      await service.login({ email: login.email , password: '12345' });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Invalid email or password');
      chai.expect(error.statusCode).to.equal(401);
    }
  })

  it('Should return throw a CustomError with status 401 and a message "Invalid email or password"' , async function () {
    try {
      await service.login({ email: 'teste.com' , password: login.password });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Invalid email or password');
      chai.expect(error.statusCode).to.equal(401);
    }
  })

  it('Should return throw a CustomError with status 401 and a message "Invalid email or password"' , async function () {
    try {
      await service.login({ email: 'teste@teste' , password: login.password });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Invalid email or password');
      chai.expect(error.statusCode).to.equal(401);
    }
  })

  it('Should return throw a CustomError with status 401 and a message "Invalid email or password"' , async function () {
    sinon.stub(UserModel.prototype, 'findByEmail').resolves(null);
    
    try {
      await service.login(login);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Invalid email or password');
      chai.expect(error.statusCode).to.equal(401);
    }
  })

  it('Should return throw a CustomError with status 401 and a message "Invalid email or password"' , async function () {
    const mock = SequelizeUser.build(user1)
    sinon.stub(UserModel.prototype, 'findByEmail').resolves(mock);
    
    try {
      await service.login({ email: login.email , password: '123456789' });
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('Invalid email or password');
      chai.expect(error.statusCode).to.equal(401);
    }
  })
})

describe('Unit tests on LoginService getRole()', function () {
  const service = new LoginService();
  beforeEach(function () {sinon.restore(); });

  it('Should return a object with statusCode 200 and a user role' , async function () {
    const mock = SequelizeUser.build(user1)
    sinon.stub(UserModel.prototype, 'find').resolves(mock);

    const response = await service.getRole(user1.id);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.keys(['statusCode', 'data']);
    chai.expect(response.statusCode).to.equal(200);
    chai.expect(response.data.role).to.equal(mock.dataValues.role);
  })

  it('Should return throw a CustomError with status 404 and a message "User not found"' , async function () {
    try {
      await service.getRole(undefined);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('User not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })

  it('Should return throw a CustomError with status 404 and a message "User not found"' , async function () {
    sinon.stub(UserModel.prototype, 'find').resolves(null);

    try {
      await service.getRole(999);
    } catch (err: unknown) {
      const error = err as CustomError;
      chai.expect(error).to.be.an.instanceOf(CustomError);
      chai.expect(error).to.have.property('message');
      chai.expect(error).to.have.property('statusCode');
      chai.expect(error.message).to.equal('User not found');
      chai.expect(error.statusCode).to.equal(404);
    }
  })
})