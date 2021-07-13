export interface TournamentAttributes {
  id: number;
  year: string;
  first: string;
  second: string;
  third: string;
  fourth: string;
  createdAt?: Date;
  updatedAt?: Date;
  StrikerId?: number;
  column?: string;
}
