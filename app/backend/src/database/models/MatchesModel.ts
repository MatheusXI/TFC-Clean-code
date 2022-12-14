/* eslint-disable linebreak-style */
import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';
import Teams from './TeamsModel';

class Matches extends Model {
  // public <campo>!: <tipo>;
  id!: number;

  homeTeam!: number;

  homeTeamGoals!: number;

  awayTeam!: number;

  awayTeamGoals!:number;

  inProgress!: boolean;
}

Matches.init(
  {
    // ... Campos
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    homeTeam: {
      type: DataTypes.NUMBER,
      references: {
        model: Teams,
        key: 'id',
      },
    },
    homeTeamGoals: DataTypes.NUMBER,
    awayTeam: {
      type: DataTypes.NUMBER,
      references: {
        model: Teams,
        key: 'id',
      },
    },
    awayTeamGoals: DataTypes.NUMBER,
    inProgress: DataTypes.BOOLEAN,
  },
  {
    // ... Outras configs
    underscored: true,
    sequelize: db,
    // modelName: 'example',
    timestamps: false,
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'teamAway' });

// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'teamAway' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
