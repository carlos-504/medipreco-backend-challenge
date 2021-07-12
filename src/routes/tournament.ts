import { Router } from 'express';
import TournamentController from '../controllers/TournamentController';

const router = Router();

router.post('/tournament/store', TournamentController.insert);
router.get('/tournament/list', TournamentController.show);
router.get('/tournament/index/:id', TournamentController.index);
router.put('/tournament/update/:id', TournamentController.update);
router.delete('/tournament/delete/:id', TournamentController.delete);
router.get(
  '/tournament/champios-with-more-titles',
  TournamentController.championsWithMoreTitles
);
router.get(
  '/tournament/team-most-vice-champions',
  TournamentController.teamMostViceChampion
);

export default router;
