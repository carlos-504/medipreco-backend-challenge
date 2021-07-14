import { StrikerAttributes } from '../interfaces/striker';
import strikers from '../data/strikerData/striker';
import db from '../models';

export const createStrikers = async (): Promise<void> => {
  try {
    const getStrikers: StrikerAttributes[] = await strikers(
      '/strikersData.csv'
    );

    const findStrikers: StrikerAttributes[] = await db.Striker.findAll();

    const allStrikers = findStrikers.map((element) => element);

    if (allStrikers.length == 0) {
      getStrikers.map((element) => {
        db.Striker.create(element);
      });

      console.log('user seed successfully executed');
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
