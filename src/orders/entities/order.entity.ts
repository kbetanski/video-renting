import { User } from 'src/users/entities/user.entity';
import { VideoItem } from 'src/videos/entities/video-item.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accepted: boolean;

  @Column()
  createdAt: Date;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => VideoItem, (videoItem) => videoItem.order)
  videoItem: VideoItem;
}
