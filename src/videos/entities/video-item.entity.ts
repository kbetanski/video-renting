import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class VideoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Video, (video) => video.videoItems)
  video: Video;
}
