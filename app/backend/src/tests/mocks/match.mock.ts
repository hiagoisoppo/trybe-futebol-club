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

export {
  matches,
  matchesWithTeams,
}