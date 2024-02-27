import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './database/typeorm/typeorm.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
