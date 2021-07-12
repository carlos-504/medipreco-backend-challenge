import { Router } from 'express';
import StrikerController from '../controllers/StrikerController';

const router = Router();

router.post('/striker/store', StrikerController.insert);
router.get('/striker/list', StrikerController.show);
router.get('/striker/index/:id', StrikerController.index);
router.put('/striker/update/:id', StrikerController.update);
router.delete('/striker/delete/:id', StrikerController.delete);
router.get(
  '/striker/team-with-more-strikers',
  StrikerController.teamWithMoreStrikers
);

export default router;
