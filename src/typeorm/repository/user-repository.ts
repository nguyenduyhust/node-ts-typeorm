import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { User } from '../entity/User';
import * as PassportUtilities from '../../utilities/passport';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createAndSave(username: string, email: string, password: string) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = PassportUtilities.getHash(password);

    return this.save(user);
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