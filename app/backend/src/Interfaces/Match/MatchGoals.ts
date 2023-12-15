import IMatch from './IMatch';

export type MatchGoals = Omit<IMatch, 'id' | 'homeTeamId' | 'awayTeamId' | 'inProgress'>;
