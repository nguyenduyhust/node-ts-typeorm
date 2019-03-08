import * as bcrypt from 'bcrypt';
import { Request } from 'express';

const saltRounds = 10;

export function getHash(password: string): string {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export function compareHash(enteredPass: string, hash: string) {
  return bcrypt.compareSync(enteredPass, hash);
}

export function getUserName(req: Request): string {
  return req.session.passport.user.username;
}