import { Router } from 'express';
import TeamRoute from './TeamRoute';
import LoginRoute from './LoginRoute';
import MatchRoute from './MatchRoute';

const router = Router();

router.use('/teams', TeamRoute);
router.use('/login', LoginRoute);
router.use('/matches', MatchRoute);
// router.use('/leaderboard', );

export default router;
