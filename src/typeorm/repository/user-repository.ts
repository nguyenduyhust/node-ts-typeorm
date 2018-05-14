import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { User } from '../entity/User';
import { getHash } from '../../utilities/passport';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createAndSave(username: string, email: string, password: string) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = getHash(password);

    return this.save(user);
  }

  async isUserExist(email: string) {
    let user = await this.findOne({email: email});
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}