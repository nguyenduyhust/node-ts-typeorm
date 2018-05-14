import { User } from '../../typeorm/entity/User';
import { getHash } from '../../utilities/passport';
import { getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../../typeorm/repository/user-repository';

const userRepository = getCustomRepository(UserRepository);

module.exports = () => {
  creator.isDataExist().then(result => {
    if (!result) {
      creator.createSeed();
    }
  });
};

type ISeedCreator = {
  isDataExist(): Promise<boolean>;
  createSeed(): Promise<void>;
};

export const creator: ISeedCreator = {
  async isDataExist() {
    return await userRepository.isUserExist('test@test.com');
  },

  async createSeed() {
    await userRepository.createAndSave('test', 'test@test.com', 'test');
  }
};