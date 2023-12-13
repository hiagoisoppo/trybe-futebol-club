import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.list(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => teamController.find(req, res),
);

router.post(
  '/',
  (req: Request, res: Response) => teamController.create(req, res),
);

router.put(
  '/:id',
  (req: Request, res: Response) => teamController.update(req, res),
);

router.delete(
  '/:id',
  (req: Request, res: Response) => teamController.delete(req, res),
);

export default router;
