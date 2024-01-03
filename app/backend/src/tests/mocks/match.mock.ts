const matches = [
  {
    id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    id:2,
    homeTeamId: 3,
    awayTeamId: 4,
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    inProgress: false,
  },
]

const  teamsStats = [
  {
    name: 'Palmeiras',
    totalPoints: 13,
    totalGames: 5,
    totalVictories:4,
    totalDraws:1,
    totalLosses:0,
    goalsFavor:17,
    goalsOwn: 5,
    goalsBalance: 12,
    efficiency: 86.67
  },
  {
    name: 'Corinthians',
    totalPoints: 12,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 12,
    goalsOwn: 3,
    goalsBalance: 9,
    efficiency: 80.00
  },
  {
    name: 'Santos',
    totalPoints: 11,
    totalGames: 5,
    totalVictories: 3,
    totalDraws: 2,
    totalLosses: 0,
    goalsFavor: 12,
    goalsOwn: 6,
    goalsBalance: 6,
    efficiency: 73.33
  },
  {
    name: 'Milwaukee Bucks',
    totalPoints: 10,
    totalGames: 5,
    totalVictories: 3,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 9,
    goalsOwn: 8,
    goalsBalance: 1,
    efficiency: 66.67
  },
  {
    name: 'Internacional',
    totalPoints: 10,
    totalGames: 5,
    totalVictories: 3,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 7,
    goalsOwn: 6,
    goalsBalance: 1,
    efficiency: 66.67
  },
  {
    name: 'Real Brasília',
    totalPoints: 10,
    totalGames: 5,
    totalVictories: 3,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 5,
    goalsOwn: 4,
    goalsBalance: 1,
    efficiency: 66.67
  },
]

const matchesWithTeams = [
  {
    id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Los Angeles Lakers',
    },
    awayTeam: {
      teamName: 'Golden State Warriors',
    },
  },
  {
    id:2,
    homeTeamId: 3,
    awayTeamId: 4,
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Boston Celtics',
    },
    awayTeam: {
      teamName: 'Cleveland Cavaliers',
    },
  },
]

const mockCreateBody422 = {
  homeTeamId: 2,
  awayTeamId: 2,
  homeTeamGoals: 0,
  awayTeamGoals: 0,
  inProgress: true,
}

const mockCreateBody404a = {
  homeTeamId: 2,
  awayTeamId: 999,
  homeTeamGoals: 0,
  awayTeamGoals: 0,
  inProgress: true,
}

const mockCreateBody404b = {
  homeTeamId: 999,
  awayTeamId: 2,
  homeTeamGoals: 0,
  awayTeamGoals: 0,
  inProgress: true,
}

const mockCreateBody201 = {
  id: 1,
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 0,
  awayTeamGoals: 0,
  inProgress: true,
}

const mockResponseCreate201 = {
  statusCode: 201,
  data: {
    id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    inProgress: true,
  },
}

const mockResponseFind200 = {
  statusCode: 200,
  data: {
    id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    inProgress: true,
  },
}

const mockResponseUpdate200 = {
  statusCode: 200,
  data: {
    id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    inProgress: true,
  },
}

const mockResponseFinish200 = {
  statusCode: 200,
  data: { message: 'Finished' },
}

const mockUpdateBody200 = {
  homeTeamGoals: 0,
  awayTeamGoals: 0,
}

const mockList200True = {
  statusCode: 200,
  data: matches.filter((match) => match.inProgress === true),
}

const mockList200False = {
  statusCode: 200,
  data: matches.filter((match) => match.inProgress === false),
}

const mockList200 = {
  statusCode: 200,
  data: matches,
}

export {
  matches,
  matchesWithTeams,
  mockCreateBody422,
  mockCreateBody404a,
  mockCreateBody404b,
  mockCreateBody201,
  mockResponseCreate201,
  mockResponseFind200,
  mockUpdateBody200,
  mockResponseUpdate200,
  mockResponseFinish200,
  mockList200True,
  mockList200False,
  mockList200,
  teamsStats,
}


