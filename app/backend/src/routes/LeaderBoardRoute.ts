import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.list(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.listHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.listAway(req, res),
);

export default router;
