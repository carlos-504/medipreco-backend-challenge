import { Request, Response } from 'express';
import { StrikerAttributes } from '../interfaces/striker';
import db from '../models';
import generateArray from '../utils/generateArray';

const { Striker } = db;

interface topScorerInterface {
  player: string;
  team: string;
}

export default class StrikerController {
  static async insert(req: Request, res: Response): Promise<Response> {
    try {
      const topScorer: topScorerInterface[] = req.body.topScorer;

      topScorer.map((element) => {
        if (typeof element.player !== 'string') {
          return res
            .status(400)
            .send({ error: 'player field only accept string type' });
        }

        if (typeof element.team !== 'string') {
          return res
            .status(400)
            .send({ error: 'team field only accept string type' });
        }

        if (element.player.length < 3 || element.player.length > 20) {
          return res
            .status(400)
            .send({ error: 'invalid number of characters on player field' });
        }

        if (element.team.length < 3 || element.team.length > 20) {
          return res
            .status(400)
            .send({ error: 'invalid number of characters on team field' });
        }
      });

      const striker: StrikerAttributes = await Striker.create(req.body);

      return res.send(striker);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const strikers = await Striker.findAll();

      return res.send(strikers);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const striker = await Striker.findByPk(id);

      return res.send(striker);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await Striker.update(req.body, { where: { id } });

      const striker = await Striker.findByPk(id);

      return res.send(striker);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await Striker.destroy({ where: { id } });

      return res.send({ message: 'Successfully delete striker' });
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async teamWithMoreStrikers(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const findStrikers = await Striker.findAll();

      const strikers: Object[] = [];

      findStrikers.map((element: StrikerAttributes) => {
        strikers.push(...element.topScorer);
      });

      const orderStrikers = generateArray(strikers, 'team', 'strikers');

      const team = orderStrikers.slice(0, 1);

      return res.send(...team);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async topStrikers(req: Request, res: Response): Promise<Response> {
    try {
      const findStrikers: Object[] = await Striker.findAll({
        order: [['goals', 'DESC']],
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      });

      const topStrikers = findStrikers.slice(0, 5);

      return res.send(topStrikers);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async listByGoals(req: Request, res: Response): Promise<Response> {
    try {
      const { goals } = req.body;

      if (goals < 1)
        return res.status(400).send({ error: 'invalid number of goals' });

      const strikers: StrikerAttributes[] = await Striker.findAll({
        where: { goals },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      });

      if (strikers.length === 0) return res.status(204).send();

      return res.send(strikers);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }
}
