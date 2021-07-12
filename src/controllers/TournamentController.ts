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

  static async championsWithMoreTitles(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const tournament = await Tournament.findAll();

      const firstChampions = tournament
        .map((element: any) => element.first)
        .reduce(
          (prev: any, curr: number) => ((prev[curr] = ++prev[curr] || 1), prev),
          {}
        );

      const orderChampions = Object.keys(firstChampions)
        .map((item) => ({
          team: item,
          titles: firstChampions[item],
        }))
        .sort((a, b) => {
          if (a.titles > b.titles) return -1;
          if (a.titles < b.titles) return 1;
          return 0;
        });

      const firstsplaced = orderChampions.slice(0, 2);

      return res.send(firstsplaced);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }
}
