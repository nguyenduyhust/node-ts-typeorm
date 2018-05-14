import { Router, Express, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repository/user-repository';
import { User } from '../typeorm/entity/User';
import { IAPIResponse } from '../constant/args';

const userRepository = getCustomRepository(UserRepository);

const router = Router();

module.exports = function(app: Express) {
  app.use('/api/auth', router);
};

router.post('/register', async (req: Request, res: Response) => {
  let { username, email, password } = req.body;

  if (await userRepository.isUserExist(email)) {
    let apiResponse: IAPIResponse = {
      code: 400,
      status: 'error',
      data: {
        message: 'Bad request',
        error: null,
      }
    };

    return res.status(400).json(apiResponse);
  }

  userRepository.createAndSave(username, email, password).then(user => {
    let apiResponse: IAPIResponse = {
      code: 200,
      status: 'success',
      data: {
        message: 'Register success',
        user: user
      }
    };

    return res.status(200).json(apiResponse);
  }).catch(err => {
    let apiResponse: IAPIResponse = {
      code: 400,
      status: 'error',
      data: {
        err: err
      }
    };

    return res.status(400).json(apiResponse);
  });
});