import { Response } from 'express';
import { topScorerInterface } from '../interfaces/striker';

export default (topScorer: topScorerInterface[], res: Response) => {
  for (let scorer of topScorer) {
    if (typeof scorer.player !== 'string') {
      res.status(400).send({ error: 'player field only accept string type' });
      return false;
    }

    if (typeof scorer.team !== 'string') {
      res.status(400).send({ error: 'team field only accept string type' });
      return false;
    }

    if (scorer.player.length < 3 || scorer.player.length > 20) {
      res.status(400).send({ error: 'player field only accept string type' });
      return false;
    }

    if (scorer.team.length < 3 || scorer.team.length > 20) {
      res
        .status(400)
        .send({ error: 'invalid number of characters on team field' });
      return false;
    }
  }

  return true;
};
