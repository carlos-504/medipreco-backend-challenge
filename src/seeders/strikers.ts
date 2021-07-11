import strikers from '../data/striker';
import db from '../models';

export const createStrikers = async (): Promise<void> => {
  try {
    const getStrikers: Object[] = await strikers('/strikersData.csv', {});

    const findStrikers: Object[] = await db.Striker.findAll();

    const allStrikers = findStrikers.map((element: any) => element.dataValues);

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
