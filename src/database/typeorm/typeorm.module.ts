// typeorm.config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeorm_sqlite_config } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use the ConfigService
      useFactory: (configService: ConfigService) => typeorm_sqlite_config,
      inject: [ConfigService], // Inject ConfigService into the factory function
    }),
  ],
  exports: [TypeOrmModule], // Export TypeOrmModule for use in other modules
})
export class TypeOrmConfigModule {}
