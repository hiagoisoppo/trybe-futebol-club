const listHomeTeamStatsQuery = `SELECT *,
(teamStats.goalsFavor - teamStats.goalsOwn) AS goalsBalance,
FORMAT(((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100), 2) AS efficiency
FROM (SELECT teams.team_name AS name,
SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3
WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END ) AS totalPoints,
COUNT(matches.id) AS totalGames,
SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 
END) AS totalVictories,
SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 
END) AS totalDraws,
SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 
END) AS totalLosses, SUM(home_team_goals) AS goalsFavor, SUM(away_team_goals) AS goalsOwn
FROM matches LEFT JOIN teams ON teams.id = matches.home_team_id WHERE in_progress = false
GROUP BY name  ) AS teamStats
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

const listAwayTeamStatsQuery = `SELECT *,
(teamStats.goalsFavor - teamStats.goalsOwn) AS goalsBalance,
FORMAT(((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100), 2) AS efficiency
FROM (SELECT teams.team_name AS name, SUM(CASE
WHEN matches.home_team_goals > matches.away_team_goals THEN 0
WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 3 END ) AS totalPoints,
COUNT(matches.id) AS totalGames,
SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 
END) AS totalVictories,
SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 
END) AS totalDraws,
SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 
END) AS totalLosses,
SUM(away_team_goals) AS goalsFavor, SUM(home_team_goals) AS goalsOwn
FROM matches LEFT JOIN teams ON teams.id = matches.away_team_id WHERE in_progress = false
GROUP BY name ) AS teamStats ORDER BY totalPoints DESC, totalVictories DESC,
goalsBalance DESC, goalsFavor DESC; `;

const listTeamStatsQuery = `
SELECT
name,
SUM(finalStats.totalPoints) AS totalPoints,
COUNT(finalStats.totalGames) AS totalGames,
SUM(finalStats.totalVictories) AS totalVictories,
SUM(finalStats.totalDraws) AS totalDraws,
SUM(finalStats.totalLosses) AS totalLosses,
SUM(finalStats.goalsFavor) AS goalsFavor,
SUM(finalStats.goalsOwn) AS goalsOwn,
SUM(finalStats.goalsFavor) - SUM(finalStats.goalsOwn) AS goalsBalance,
FORMAT((SUM(finalStats.totalPoints) / (COUNT(finalStats.totalGames) * 3)) * 100, 2)
AS efficiency
FROM (
  SELECT
  *
FROM (
  SELECT teams.team_name AS name,
      (CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END ) AS totalPoints,
      (matches.id) AS totalGames,
      (CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 
        END) AS totalVictories,
      (CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 
        END) AS totalDraws,
      (CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 
        END) AS totalLosses,
      (home_team_goals) AS goalsFavor,
      (away_team_goals) AS goalsOwn
    FROM matches
    LEFT JOIN teams ON teams.id = matches.home_team_id
    WHERE in_progress = false
) AS hTeamStats
UNION ALL
SELECT
  *
FROM (
  SELECT teams.team_name AS name,
      (CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 3
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END ) AS totalPoints,
      (matches.id) AS totalGames,
      (CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 
        END) AS totalVictories,
      (CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 
        END) AS totalDraws,
      (CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 
        END) AS totalLosses,
      (away_team_goals) AS goalsFavor,
      (home_team_goals) AS goalsOwn
    FROM matches
    LEFT JOIN teams ON teams.id = matches.away_team_id
    WHERE in_progress = false
) AS aTeamStats
) AS finalStats
GROUP BY name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

export {
  listHomeTeamStatsQuery,
  listAwayTeamStatsQuery,
  listTeamStatsQuery,
};
