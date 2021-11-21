import { Configuration } from './types';

export const config = (): Configuration => ({
  PORT: Number(process.env.PORT),
  SECRET_KEY: process.env.SECRET_KEY,

  AUTH: {
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: '90d',
    },
  },

  TEST_DATABASE: {
    type: 'sqlite',
    database: 'database.test.sqlite3',
    synchronize: true,
    logging: false,
    entities: ['src/**/*.entity.js'],
    driver: 'sqlite3',
  },

  DATABASE: {
    port: 5432,
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
  },
});
