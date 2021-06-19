import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { VideosModule } from 'src/videos/videos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UsersModule, VideosModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
