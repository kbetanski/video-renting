import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VideoItem } from './video-item.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  genre: string;

  @Column()
  price: number;

  @OneToMany(() => VideoItem, (videoItem) => videoItem.video)
  videoItems: VideoItem[];
}
