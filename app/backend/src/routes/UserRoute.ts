import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => userController.create(req, res, next),
);

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => userController.update(req, res, next),
);

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => userController.delete(req, res, next),
);

export default router;
