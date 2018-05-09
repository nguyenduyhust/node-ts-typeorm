import { Router, Express, Request, Response } from 'express';

const router = Router();

module.exports = function(app: Express) {
  app.use('/api', router);
};