import { User } from 'src/users/entities/user.entity';
import { VideoItem } from 'src/videos/entities/video-item.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => VideoItem, (videoItem) => videoItem.order)
  videoItem: VideoItem;
}
