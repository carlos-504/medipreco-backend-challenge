import { Request, Response } from 'express';
import db from '../models';

const { Striker } = db;

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
}
