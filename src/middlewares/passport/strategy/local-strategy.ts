import express, { Express } from 'express';
import { Strategy } from 'passport-local';
import { getCustomRepository } from 'typeorm';
import * as passport from 'passport';

import { UserRepository } from '../../../typeorm/repository/user-repository';
const userRepository = getCustomRepository(UserRepository);

module.exports = (app: Express) => {
  let strategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    console.log('email: ' + email);
    console.log('password: ' + password);
    try {
      let user = await userRepository.authenticate(email, password);
      if (user) {
        return done(undefined, user);
      } else {
        return done(undefined, false, { message: 'Fail to login.' });
      }
    } catch (err) {
      return done(undefined, false, { message: err.message });
    }
  });

  passport.use(strategy);
};