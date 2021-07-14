export interface StrikerAttributes {
  id: number;
  topScorer: Object[];
  goals: number;
  createdAt?: Date;
  updatedAt?: Date;
  column?: string;
}

export interface topScorerInterface {
  player: string;
  team: string;
}
