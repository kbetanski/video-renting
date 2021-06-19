import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { VideosModule } from './videos/videos.module';
import { OrdersModule } from './orders/orders.module';
import { VideoItem } from './videos/entities/video-item.entity';
import { Video } from './videos/entities/video.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'video',
      entities: [User, Video, VideoItem],
      synchronize: true,
    }),
    VideosModule,
    OrdersModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
