// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// const sinonChai = require('sinon-chai');

// chai.use(sinonChai);

// import LoginService from '../services/LoginService';
// import LoginController from '../controllers/LoginController';
// import { NextFunction, Request, Response } from 'express';
// import CustomError from '../utils/CustomError';
// import { login, serviceResponseLogin200 } from './mocks/login. mock';


// describe('Unit tests on LoginController login()', function () {
//   const controller = new LoginController();
//   const req = {} as Request;
//   const res = {} as Response;
//   const next: NextFunction = () => {};

//   beforeEach(function () {
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     sinon.restore();
//   });

//   it('Should return a response with status 200 and body with a token' , async function () {
//     req.body = login;
//     sinon.stub(LoginService.prototype, 'login').resolves(serviceResponseLogin200);

//     await controller.login(req, res, next);

//     chai.expect(res.status).to.have.been.calledWith(200);
//     chai.expect(res.json).to.have.been.calledWith(serviceResponseLogin200.data);
//   })

//   it('Should return a response with status 200 and body with a token' , async function () {
//     req.body = login;
//     sinon.stub(LoginService.prototype, 'login').resolves(serviceResponseLogin200);

//     await controller.login(req, res, next);

//     chai.expect(res.status).to.have.been.calledWith(200);
//     chai.expect(res.json).to.have.been.calledWith(serviceResponseLogin200.data);
//   })
// })

// // describe('Unit tests on LoginController getRole()', function () {
// //   const controller = new TeamController();
// //   const req = {} as Request;
// //   const res = {} as Response;
// //   const next: NextFunction = () => {};

// //   beforeEach(function () {
// //     res.status = sinon.stub().returns(res);
// //     res.json = sinon.stub().returns(res);
// //     sinon.restore();
// //   });

// //   it('Should return a response with status 200 and body with team data' , async function () {
// //     req.params = { id: '4' };
// //     sinon.stub( TeamService.prototype, 'find').resolves(serviceResponseFind200);

// //     await controller.find(req, res, next);

// //     chai.expect(res.status).to.have.been.calledWith(200);
// //     chai.expect(res.json).to.have.been.calledWith(serviceResponseFind200.data);
// //   })
// // })
