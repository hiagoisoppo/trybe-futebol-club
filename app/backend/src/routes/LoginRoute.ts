import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();
const router = Router();

router.get('/', (req: Request, res: Response) => loginController.login(req, res));

export default router;
