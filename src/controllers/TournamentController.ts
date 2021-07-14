import { Request, Response } from 'express';
import { TournamentAttributes } from '../interfaces/tournament';
import db from '../models';
import generateArray from '../utils/generateArray';

const { Tournament, Striker } = db;

interface accessObjInterface {
  [key: string]: string[];
}

export default class TournamentController {
  static async insert(req: Request, res: Response): Promise<void> {
    try {
      const tournament: TournamentAttributes = await Tournament.create(
        req.body
      );

      res.send(tournament);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const tournament: TournamentAttributes[] = await Tournament.findAll({
        include: [Striker],
      });

      res.send(tournament);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async index(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const tournament: TournamentAttributes = await Tournament.findByPk(id, {
        include: [Striker],
      });

      if (!tournament) return res.status(204).send();

      res.send(tournament);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async update(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;

      const tournament: TournamentAttributes = await Tournament.findByPk(id, {
        include: [Striker],
      });

      if (!tournament)
        return res.status(400).send({ error: 'tournament not fount' });

      await Tournament.update(req.body, { where: { id } });

      const newTournament: TournamentAttributes = await Tournament.findByPk(
        id,
        { include: [Striker] }
      );

      res.send(newTournament);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const tournament: TournamentAttributes = await Tournament.findByPk(id, {
        include: [Striker],
      });

      if (!tournament)
        return res.status(400).send({ error: 'tournament not fount' });

      await Tournament.destroy({ where: { id } });

      return res.send({ message: 'Successfully delete striker' });
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  static async championsWithMoreTitles(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const tournament: TournamentAttributes[] = await Tournament.findAll();

      const orderChampions = generateArray(
        tournament,
        'first',
        'titles'
      ).filter((element) => {
        return element.titles > 1;
      });

      res.send(orderChampions);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async teamMostViceChampion(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const tournament: TournamentAttributes[] = await Tournament.findAll();

      const orderChampions = generateArray(tournament, 'second', 'titles');

      const team = orderChampions.slice(0, 1);

      res.send(...team);
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  static async topRankedTeams(req: Request, res: Response): Promise<void> {
    const allTeams: string[] = [];
    try {
      const tournaments: TournamentAttributes[] = await Tournament.findAll({
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

      tournaments.map((element) => {
        const arr = [element.second, element.third, element.fourth];
        allTeams.push(...arr);
      });

      const teams = allTeams.reduce(
        (prev: Record<string, number>, curr: string) => {
          return (prev[curr] = ++prev[curr] || 1), prev;
        },
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

      res.send(topTeams);
    } catch (err) {
      res.status(400).send({ err });
    }
  }
}
