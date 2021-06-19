import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { VideosService } from 'src/videos/videos.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  public constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly videoService: VideosService,
  ) {}

  public async order(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<Order> {
    const user = await this.usersService.findOne(userId);
    const item = await this.videoService.findOneItem(
      createOrderDto.videoItemId,
    );

    const order = this.ordersRepository.create({
      accepted: false,
      user: user,
      videoItem: item,
    });

    if (user.role === Role.Admin && createOrderDto.userId) {
      const overrideUser = await this.usersService.findOne(
        createOrderDto.userId,
      );
      order.user = overrideUser;
    }

    const saved = await this.ordersRepository.save(order);

    return saved;
  }

  public async accept(id: number): Promise<Order> {
    const order = await this.findOne(id);
    order.accepted = true;

    const accepted = await this.ordersRepository.save(order);

    return accepted;
  }

  public async findAll(): Promise<Order[]> {
    const orders = await this.ordersRepository.find();

    if (orders.length === 0) {
      throw new NotFoundException();
    }

    return orders;
  }

  public async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne(id);

    if (!order) {
      throw new NotFoundException();
    }

    return order;
  }
}
