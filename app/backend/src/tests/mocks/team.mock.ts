const teams = [
  { id: 1, teamName: 'Cleveland Cavaliers' },
  { id: 2, teamName: 'Chicago Bulls' },
  { id: 3, teamName: 'New York Knicks' },
  { id: 4, teamName: 'Toronto Raptors' },
  { id: 5, teamName: 'Dallas Mavericks' },
  { id: 6, teamName: 'Minnesota Timberwolves' },
  { id: 7, teamName: 'Memphis Grizzlies' },
  { id: 8, teamName: 'Milwaukee Bucks' },
  { id: 9, teamName: 'Los Angeles Lakers' },
  { id: 10, teamName: 'Atlanta Hawks' },
];

const serviceResponseCreate201 = {
  statusCode: 201,
  data: teams[7],
}

const reqBodyCreate201 = {
  teamName: teams[7].teamName,
}

const serviceResponseUpdate200 = {
  statusCode: 200,
  data: teams[5],
}

const reqBodyUpdate200 = {
  teamName: teams[5].teamName,
}

const serviceResponseList200 = {
  statusCode: 200,
  data: teams,
}

const serviceResponseFind200 = {
  statusCode: 200,
  data: teams[3],
}

const serviceResponseDelete204 = {
  statusCode: 204,
  data: null,
}

export {
  teams,
  serviceResponseCreate201,
  reqBodyCreate201,
  serviceResponseUpdate200,
  reqBodyUpdate200,
  serviceResponseList200,
  serviceResponseFind200,
  serviceResponseDelete204,
}