import { Response, Router, Request, NextFunction } from 'express';
import getTeamByIdController from '../useCases/Teams/GetTeamById';
import getAllTeamsController from '../useCases/Teams/GetAllTeams';
import getTeamAndMatchesController from '../useCases/Teams/GetTeamAndMatches';

const teamRouter = Router();

teamRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  getAllTeamsController.handle(req, res, next));

teamRouter.get('/teste', (req: Request, res: Response, next: NextFunction) =>
  getTeamAndMatchesController.handle(req, res, next));

teamRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  getTeamByIdController.handle(req, res, next));

/* router.post(
  '/login',
  loginValidationMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    loginController.handle(req, res, next),
);

router.get(
  '/login/validate',
  (req: Request, res: Response, next: NextFunction) =>
    loginValidateController.handle(req, res, next),
); */

export default teamRouter;
