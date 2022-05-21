export interface Iresults {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
export default class GenerateRank {
  private static isWinner(teams: Iresults[]): Iresults[] {
    const sortedTeams = teams.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;

      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;

      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;

      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;

      if (a.goalsOwn < b.goalsOwn) return -1;
      if (a.goalsOwn > b.goalsOwn) return 1;

      return 0;
    });

    return sortedTeams;
  }

  static generateRank(teams: Iresults[]) {
    // const sortedByTotalPoints = GenerateRank.isWinner(teams, 'totalPoints');
    // if (sortedByTotalPoints) return sortedByTotalPoints;
    // const sortedByTotalVictories = GenerateRank.isWinner(
    //   teams,
    //   'totalVictories',
    // );
    // if (sortedByTotalVictories) return sortedByTotalVictories;
    // const sortedByBalance = GenerateRank.isWinner(teams, 'goalsBalance');
    // if (sortedByBalance) return sortedByBalance;
    // const sortedByGoalsFavor = GenerateRank.isWinner(teams, 'goalsFavor');
    // if (sortedByGoalsFavor) return sortedByGoalsFavor;
    // const sortedByGoalsOwn = GenerateRank.isWinner(teams, 'goalsOwn');
    // if (sortedByGoalsOwn) return sortedByGoalsOwn;
    const rank = GenerateRank.isWinner(teams);
    return rank;
  }
}
