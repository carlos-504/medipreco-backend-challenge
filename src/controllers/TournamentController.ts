import { Request, Response } from 'express';
import db from '../models';

const { Tournament, Striker } = db;

export default class TournamentController {
  static async insert(req: Request, res: Response) {
    try {
      const tournament = await Tournament.create(req.body);

      res.send(tournament);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const tournament = await Tournament.findAll({ include: [Striker] });

      return res.send(tournament);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const tournament = await Tournament.findByPk(id, { include: [Striker] });

      return res.send(tournament);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await Tournament.update(req.body, { where: { id } });

      const tournament = await Tournament.findByPk(id, { include: [Striker] });

      return res.send(tournament);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await Tournament.destroy({ where: { id } });

      return res.send({ message: 'Successfully delete striker' });
    } catch (err) {
      return res.status(400).send({ err });
    }
  }
}
