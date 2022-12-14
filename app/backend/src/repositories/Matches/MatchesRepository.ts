import Teams from '../../database/models/TeamsModel';
import Matches from '../../database/models/MatchesModel';
import IMatchesRepository from './IMatchesRepository';
import { IMatch } from '../../useCases/Matches/CreateMatch/createMatchDTO';
import IPatchMatchDTO from '../../useCases/Matches/PatchMatch/patchMatchDTO';

export default class MatchesRepository implements IMatchesRepository {
  private matchesModel;

  constructor() {
    this.matchesModel = Matches;
  }

  async updateMatch(data: IPatchMatchDTO): Promise<Matches | null> {
    const { id, ...obj } = data;
    await this.matchesModel.update({ ...obj }, { where: { id } });
    const updatedMatch = await this.getmatchById(id);
    return updatedMatch;
  }

  async updateProgress(id: number): Promise<Matches | null> {
    const user = await this.matchesModel.findByPk(id);
    await this.matchesModel.update(
      { inProgress: !user?.inProgress },
      { where: { id } },
    );
    const userUpdated = await this.getmatchById(id);
    return userUpdated;
  }

  async getmatchById(id: number): Promise<Matches | null> {
    const match = await this.matchesModel.findByPk(id);
    return match;
  }

  async createMatch(data: IMatch): Promise<IMatch | null> {
    await this.matchesModel.create(data);
    const matches = await (
      await this.matchesModel.findAll({
        attributes: { exclude: ['home_team', 'away_team'] },
      })
    ).reverse();
    return matches[0];
  }

  async getAllMatches(): Promise<Matches[] | null> {
    const matchesArray = await this.matchesModel.findAll({
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matchesArray;
  }

  async getMatchesByProgress(progress: boolean): Promise<Matches[] | null> {
    const matchesArray = await this.matchesModel.findAll({
      attributes: { exclude: ['home_team', 'away_team'] },
      where: { inProgress: progress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matchesArray;
  }
}
