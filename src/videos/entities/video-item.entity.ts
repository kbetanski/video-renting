import { Order } from 'src/orders/entities/order.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Video } from './video.entity';

@Entity({ name: 'video_items' })
export class VideoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Video, (video) => video.videoItems)
  video: Video;

  @OneToMany(() => Order, (order) => order.videoItem)
  order: Order[];
}
