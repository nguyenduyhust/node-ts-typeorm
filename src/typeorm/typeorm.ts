import { createConnection, Connection } from 'typeorm';
import { Express } from 'express';
import 'reflect-metadata';
const glob = require('glob');
import { User } from './entity/User';
import { getRepository } from 'typeorm';

module.exports = async (app: Express) => {
  // Connect to DB
  const connection = await createConnection();
  console.log('Connected with ' + connection.driver.database + ' database');

  // Load data seed
  let seeds = glob.sync(__dirname + '/seeds/*.+(js|jsx|ts|tsx|)');
  seeds.forEach((seed: string) => {
    console.log('Loading seed: ' + seed);
    require(seed)();
  });
};