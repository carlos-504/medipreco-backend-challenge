export interface StrikerAttributes {
  id: number;
  topScorer: topScorerInterface[];
  goals: number;
  createdAt?: Date;
  updatedAt?: Date;
  column?: string;
}

export interface topScorerInterface {
  player: string;
  team: string;
}
