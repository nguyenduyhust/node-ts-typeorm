import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export function getHash(password: string): string {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export function compareHash(enteredPass: string, hash: string) {
  return bcrypt.compareSync(enteredPass, hash);
}