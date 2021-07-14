import { Express } from 'express';
import striker from './striker';
import tournament from './tournament';

export default (app: Express): void => {
  app.use(striker);
  app.use(tournament);
};
