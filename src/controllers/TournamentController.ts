import { Request, Response } from 'express';
import { TournamentAttributes } from '../models/tournament';
import db from '../models';

const { Tournament, Striker } = db;

interface tournamentInterface extends TournamentAttributes {
  createdAt: Date;
  updatedAt: Date;
  StrikerId: number;
}

export default class TournamentController {
  static async insert(req: Request, res: Response) {
    try {
      const tournament: Promise<tournamentInterface> = await Tournament.create(
        req.body
      );

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
      const tournament: Promise<tournamentInterface> =
        await Tournament.findByPk(id, { include: [Striker] });

      return res.send(tournament);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await Tournament.update(req.body, { where: { id } });

      const tournament: Promise<tournamentInterface> =
        await Tournament.findByPk(id, { include: [Striker] });

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
        .map((element: tournamentInterface) => element.first)
        .reduce(
          (prev: number[], curr: number) => (
            (prev[curr] = ++prev[curr] || 1), prev
          ),
          {}
        );

      const orderChampions = Object.keys(firstChampions)
        .map((item) => ({
          team: item,
          titles: firstChampions[item],
        }))
        .filter((element) => {
          return element.titles > 1;
        })
        .sort((a, b) => {
          if (a.titles > b.titles) return -1;
          if (a.titles < b.titles) return 1;
          return 0;
        });

      return res.send(orderChampions);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async teamMostViceChampion(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const tournament = await Tournament.findAll();

      const viceChampions = tournament
        .map((element: tournamentInterface) => element.second)
        .reduce(
          (prev: number[], curr: number) => (
            (prev[curr] = ++prev[curr] || 1), prev
          ),
          {}
        );
      const orderChampions = Object.keys(viceChampions)
        .map((item) => ({
          team: item,
          viceTitles: viceChampions[item],
        }))
        .sort((a, b) => {
          if (a.viceTitles > b.viceTitles) return -1;
          if (a.viceTitles < b.viceTitles) return 1;
          return 0;
        });

      const team = orderChampions.slice(0, 1);

      return res.send(...team);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async topRankedTeams(req: Request, res: Response): Promise<Response> {
    const allTeams: Object[] = [];
    try {
      const tournaments = await Tournament.findAll({
        attributes: {
          exclude: [
            'id',
            'year',
            'first',
            'createdAt',
            'updatedAt',
            'StrikerId',
          ],
        },
      });

      tournaments.map((element: tournamentInterface) => {
        const arr = [element.second, element.third, element.fourth];
        allTeams.push(...arr);
      });

      const teams = allTeams.reduce(
        (prev: any, curr: any) => ((prev[curr] = ++prev[curr] || 1), prev),
        {}
      );

      const orderTeams = Object.keys(teams)
        .map((item) => ({
          classifications: teams[item],
          team: item,
        }))
        .sort((a, b) => {
          if (a.classifications > b.classifications) return -1;
          if (a.classifications < b.classifications) return 1;
          return 0;
        });

      const topTeams = orderTeams.slice(0, 5);

      return res.send(topTeams);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }
}
