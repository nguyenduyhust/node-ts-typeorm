import { Router, Express, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

module.exports = (app: Express) => {
  app.use('/', router);
};