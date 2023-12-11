import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const router = Router();

router.post('/', (req: Request, res: Response) => userController.create(req, res));

router.put('/:id', (req: Request, res: Response) => userController.update(req, res));

router.delete('/:id', (req: Request, res: Response) => userController.delete(req, res));

export default router;
