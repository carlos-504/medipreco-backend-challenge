import tournaments from '../data/tournamentData/tournament';
import db from '../models';

export const createTournament = async (): Promise<void> => {
  try {
    const getTournament: Object[] = await tournaments('/tournamentData.csv');

    const findTournaments: Object[] = await db.Tournament.findAll();

    const Alltournaments = findTournaments.map(
      (element: any) => element.dataValues
    );

    const newTournaments = getTournament.map((element, index) => {
      return {
        ...element,
        StrikerId: index + 1,
      };
    });

    if (Alltournaments.length == 0) {
      newTournaments.map(async (element) => {
        await db.Tournament.create(element);
      });

      console.log('tournaments seed successfully executed');
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
