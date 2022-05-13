import * as Joi from 'joi';

const matchesSchema = Joi.object({
  homeTeam: Joi.number().required().min(1).messages({
    'number.base': 'homeTeam must be a number',
    'any.required': 'HomeTeam is required',
    'number.min': 'Home team Id must be bigger than 0',
  }),
  awayTeam: Joi.number().required().min(1).messages({
    'number.base': 'awayTeam must be a number',
    'any.required': 'awayTeam is required',
    'number.min': 'awayTeam Id must be bigger than 0',
  }),
  homeTeamGoals: Joi.number().required().min(1).messages({
    'number.base': 'homeTeamGoals must be a number',
    'any.required': 'homeTeamGoals is required',
    'number.min': 'homeTeamGoals Id must be bigger than 0',
  }),
  awayTeamGoals: Joi.number().required().min(1).messages({
    'number.base': 'awayTeamGoals must be a number',
    'any.required': 'awayTeamGoals is required',
    'number.min': 'awayTeamGoals Id must be bigger than 0',
  }),
  inProgress: Joi.boolean()
    .messages({
      'boolean.base': 'inProgress must be a boolean',
      'any.required': 'inProgress is required',
    }),
});

export default matchesSchema;
