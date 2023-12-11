import { Request, Response, Router, NextFunction } from 'express';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();
const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => loginController.login(req, res, next),
);

export default router;
