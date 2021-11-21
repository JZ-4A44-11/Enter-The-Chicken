import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export interface Configuration {
  PORT: number;
  SECRET_KEY: string;
  AUTH: {
    secret: string;
    signOptions: {
      expiresIn: string;
    };
  };
  DATABASE: PostgresConnectionOptions;
  TEST_DATABASE: SqliteConnectionOptions;
}
