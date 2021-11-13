import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  port: 5432,
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/db/migrations/*.js'],
  cli: { migrationsDir: 'src/db/migrations' },
};
export default ormConfig;
