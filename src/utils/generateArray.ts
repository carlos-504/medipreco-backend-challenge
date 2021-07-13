import { TournamentAttributes } from '../interfaces/tournament';
import { StrikerAttributes } from '../models/striker';

export default (db: any, column: string, place: string) => {
  const champions = db
    .map(
      (element: TournamentAttributes | StrikerAttributes | any) =>
        element[column]
    )
    .reduce(
      (prev: number[], curr: number) => (
        (prev[curr] = ++prev[curr] || 1), prev
      ),
      {}
    );

  const orderChampions = Object.keys(champions)
    .map((item) => ({
      team: item,
      [place]: champions[item],
    }))
    .sort((a, b) => {
      if (a[place] > b[place]) return -1;
      if (a[place] < b[place]) return 1;
      return 0;
    });

  return orderChampions;
};
