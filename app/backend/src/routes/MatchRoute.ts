import { Request, Response, Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
// import MatchController from '../controllers/MatchController';

// const matchController = new MatchController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => res.send('EM ANDAMENTO 1'),
);

router.patch(
  '/:id/finish',
  authMiddleware,
  (req: Request, res: Response) => res.send('EM ANDAMENTO 2'),
);

router.patch(
  '/:id',
  authMiddleware,
  (req: Request, res: Response) => res.send('EM ANDAMENTO 3'),
);

router.post(
  '/',
  authMiddleware,
  (req: Request, res: Response) => res.send('EM ANDAMENTO 4'),
);

export default router;
