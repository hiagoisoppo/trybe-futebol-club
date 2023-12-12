import { Request, Response, Router, NextFunction } from 'express';
import LoginController from '../controllers/LoginController';
import authMiddleware from '../middlewares/authMiddleware';

const loginController = new LoginController();
const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => loginController.login(req, res, next),
);

router.get(
  '/role',
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => loginController.getRole(req, res, next),
);

export default router;
