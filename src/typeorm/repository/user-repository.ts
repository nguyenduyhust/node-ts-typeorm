import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { User } from '../entity/User';
import * as PassportUtilities from '../../utilities/passport';
import { validate } from 'class-validator';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave(username: string, email: string, password: string) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = PassportUtilities.getHash(password);

    const validateErrors = await validate(user);
    if (validateErrors.length > 0) {
      throw new Error('Validation failed!');
    } else {
      return this.save(user);
    }
  }

  async isUserExist(email: string) {
    let user = await this.findOne({ email: email });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async authenticate(email: string, password: string) {
    let user = await this.findOne({ email: email });

    if (user) {
      if (PassportUtilities.compareHash(password, user.password)) {
        return user;
      } else {
        throw new Error('Passport is incorrect');
      }
    } else {
      throw new Error('Can not find user');
    }
  }
}