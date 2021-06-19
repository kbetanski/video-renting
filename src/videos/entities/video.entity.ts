import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
