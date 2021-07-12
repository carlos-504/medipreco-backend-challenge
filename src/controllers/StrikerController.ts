import { Request, Response } from 'express';
import { StrikerAttributes } from '../models/striker';
import db from '../models';

const { Striker } = db;

interface strikerInterface extends StrikerAttributes {
  createdAt: Date;
  updatedAt: Date;
}

export default class StrikerController {
  static async insert(req: Request, res: Response): Promise<Response> {
    try {
      const striker = await Striker.create(req.body);

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
    const strikers: Object[] = [];
    try {
      const findStrikers = await Striker.findAll();

      findStrikers.map((element: strikerInterface) => {
        strikers.push(...element.topScorer);
      });

      const teams = strikers
        .map((element: any) => element.team)
        .reduce(
          (prev: number[], curr: number) => (
            (prev[curr] = ++prev[curr] || 1), prev
          ),
          {}
        );

      const orderStrikers = Object.keys(teams)
        .map((item) => ({
          team: item,
          strikers: teams[item],
        }))
        .sort((a, b) => {
          if (a.strikers > b.strikers) return -1;
          if (a.strikers < b.strikers) return 1;
          return 0;
        });

      const team = orderStrikers.slice(0, 1);

      return res.send(...team);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }
}
