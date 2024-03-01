import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ColorsService } from 'src/colors/colors.service';
import { ColorsModule } from 'src/colors/colors.module';


@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [ColorsModule],
})
export class PostsModule {}
