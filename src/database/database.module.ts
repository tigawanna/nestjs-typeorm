import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow("POSTGRES_HOST"),
        port:configService.getOrThrow("POSTGRES_PORT"),
        username: configService.getOrThrow("POSTGRES_USERNAME"),
        password: configService.getOrThrow("POSTGRES_PASSWORD"),
        database: configService.getOrThrow("POSTGRES_DATABASE"),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.DEV ? true : true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
