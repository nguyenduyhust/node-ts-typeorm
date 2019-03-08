import { Router, Express, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';
import * as PassportUtility from '../utilities/passport';

const router = Router();

module.exports = (app: Express) => {
  app.use('/admin', router);
};

router.get('/login', (req: any, res: any, next: any) => {
  res.render('login', {
    message: req.flash('error'),
  });
});

router.post('/login', passport.authenticate('local',
  { successRedirect: '/admin', failureRedirect: '/admin/login', failureFlash: true }
));

router.get('/logout', (req: Request, res: Response) => {
  req.logout();
  res.redirect('admin/login');
});

router.get('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin/login');
}, (req: Request, res: Response) => {
  res.render('admin', {
    username: PassportUtility.getUserName(req),
  });
});