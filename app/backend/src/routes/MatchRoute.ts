import { Request, Response, Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchController.list(req, res),
);

router.patch(
  '/:id/finish',
  authMiddleware,
  (req: Request, res: Response) => matchController.finish(req, res),
);

router.patch(
  '/:id',
  authMiddleware,
  (req: Request, res: Response) => matchController.update(req, res),
);

router.post(
  '/',
  authMiddleware,
  (req: Request, res: Response) => matchController.create(req, res),
);

export default router;
