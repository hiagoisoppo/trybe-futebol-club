import { Router } from 'express';
import TeamRoute from './TeamRoute';
import LoginRoute from './LoginRoute';

const router = Router();

router.use('/teams', TeamRoute);
router.use('/login', LoginRoute);
// router.use('/matches', );
// router.use('/leaderboard', );

export default router;
