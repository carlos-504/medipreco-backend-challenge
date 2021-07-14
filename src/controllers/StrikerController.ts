import { Request, Response } from 'express';
import { StrikerAttributes } from '../interfaces/striker';
import { topScorerInterface } from '../interfaces/striker';
import customValidations from '../utils/customValidations';
import db from '../models';
import generateArray from '../utils/generateArray';

const { Striker } = db;

export default class StrikerController {
  static async insert(req: Request, res: Response): Promise<void> {
    try {
      const topScorer: topScorerInterface[] = req.body.topScorer;

      const valid = customValidations(topScorer, res);

      if (!valid) return;

      const striker: StrikerAttributes = await Striker.create(req.body);
      res.send(striker);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const strikers: StrikerAttributes = await Striker.findAll();

      res.send(strikers);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async index(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;

    try {
      const striker: StrikerAttributes = await Striker.findByPk(id);

      if (!striker) {
        return res.status(204).send();
      }

      res.send(striker);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async update(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const topScorer: topScorerInterface[] = req.body.topScorer;

      const striker: StrikerAttributes = await Striker.findByPk(id);

      if (!striker) {
        return res.status(400).send({ message: 'striker not found' });
      }

      const valid = customValidations(topScorer, res);

      if (!valid) return;

      await Striker.update(req.body, { where: { id } });

      const newStriker = await Striker.findByPk(id);

      res.send(newStriker);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const striker: StrikerAttributes = await Striker.findByPk(id);

      if (!striker) {
        return res.status(400).send({ message: 'striker not found' });
      }

      await Striker.destroy({ where: { id } });

      res.send({ message: 'Successfully delete striker' });
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async teamWithMoreStrikers(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const findStrikers: StrikerAttributes[] = await Striker.findAll();

      const strikers: Array<StrikerAttributes> = [];

      findStrikers.map((element: any) => {
        strikers.push(...element.topScorer);
      });

      const orderStrikers = generateArray(strikers, 'team', 'strikers');

      const team = orderStrikers.slice(0, 1);

      res.send(...team);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async topStrikers(req: Request, res: Response): Promise<void> {
    try {
      const findStrikers: Object[] = await Striker.findAll({
        order: [['goals', 'DESC']],
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      });

      const topStrikers = findStrikers.slice(0, 5);

      res.send(topStrikers);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async listByGoals(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      const goals: number = req.body.goals;

      if (goals < 1)
        return res.status(400).send({ error: 'invalid number of goals' });

      const strikers: StrikerAttributes[] = await Striker.findAll({
        where: { goals },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      });

      if (strikers.length === 0) return res.status(204).send();

      res.send(strikers);
    } catch (err) {
      res.status(400).send({ err });
    }
  }
}
