import { Router } from 'express';
import TeamRoute from './TeamRoute';
import LoginRoute from './LoginRoute';
import MatchRoute from './MatchRoute';
import LeaderBoardRoute from './LeaderBoardRoute';

const router = Router();

router.use('/teams', TeamRoute);
router.use('/login', LoginRoute);
router.use('/matches', MatchRoute);
router.use('/leaderboard', LeaderBoardRoute);

export default router;
