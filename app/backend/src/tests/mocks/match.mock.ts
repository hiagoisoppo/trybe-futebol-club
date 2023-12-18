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

const mockUpdateBody200 = {
  homeTeamGoals: 0,
  awayTeamGoals: 0,
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
}