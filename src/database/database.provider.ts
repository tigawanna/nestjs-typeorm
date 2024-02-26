import { DataSource } from 'typeorm';
import { typeorm_sqlite_config } from './typeorm.config';

export const databaseProviders = [
  {
    provide: 'TYPEORM_DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(typeorm_sqlite_config);
      return dataSource.initialize();
    },
  },
];
