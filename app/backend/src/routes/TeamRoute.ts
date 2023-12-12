import { NextFunction, Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.list(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => teamController.find(req, res, next),
);

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => teamController.create(req, res, next),
);

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => teamController.update(req, res, next),
);

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => teamController.delete(req, res, next),
);

export default router;
