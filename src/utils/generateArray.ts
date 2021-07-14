import { TournamentAttributes } from '../interfaces/tournament';
import { StrikerAttributes } from '../interfaces/striker';

export default (
  db: TournamentAttributes[] | StrikerAttributes[],
  column: string,
  place: string
) => {
  const champions = db
    .map((element: any) => element[column])
    .reduce(
      (prev: Record<string, number>, curr: string) => (
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
