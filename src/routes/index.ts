import { Router, Express, Request, Response } from 'express';

const router = Router();

module.exports = (app: Express) => {
  app.use('/', router);
};

router.get('/', (req: Request, res: Response) => {
  res.render('index');
});