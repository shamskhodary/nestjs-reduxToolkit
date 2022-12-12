import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/entities/posts.entity';
import { User } from 'src/entities/users.entity';
import { TEST, DEVELOPMENT, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

const { NODE_ENV } = process.env;
export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config;
      switch (NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;

        case PRODUCTION:
          config = databaseConfig.production;
          break;

        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Post]);
      await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
