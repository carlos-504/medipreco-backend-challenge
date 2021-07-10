import striker from './striker';
import tournament from './tournament';

export default (app: any): void => {
  app.use(striker);
  app.use(tournament);
};
