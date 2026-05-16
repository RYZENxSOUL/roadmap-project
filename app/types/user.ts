export interface WowGame {
  name: string;

  attempts: number;

  last_attempt: string | null;

  total_attempts: number;
}

export interface User {
  _id: string;

  name: string;

  email: string;

  edcoins: number;

  wow_games: WowGame[];
}