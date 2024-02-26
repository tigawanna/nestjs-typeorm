import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const typeorm_sqlite_config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};


