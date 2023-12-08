import { Router } from 'express';
import TeamRoute from './TeamRoute';

const router = Router();

router.use('/teams', TeamRoute);
// router.use('/login', );
// router.use('/matches', );
// router.use('/leaderboard', );

export default router;
