import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoItem } from './entities/video-item.entity';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  public constructor(
    @InjectRepository(Video)
    private readonly videosRepository: Repository<Video>,
    @InjectRepository(VideoItem)
    private readonly videoItemsRepository: Repository<VideoItem>,
  ) {}

  public async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const video = this.videosRepository.create(createVideoDto);

    const search = await this.videosRepository.find({
      where: {
        title: video.title,
        director: video.director,
      },
    });

    if (search) {
      throw new BadRequestException('Video already exists');
    }

    return await this.videosRepository.save(video);
  }

  public async createItem(videoId: number): Promise<VideoItem> {
    const video = await this.findOne(videoId);

    const videoItem = await this.videoItemsRepository.save({ video: video });

    return videoItem;
  }

  public async findAll(): Promise<Video[]> {
    const videos = await this.videosRepository.find();

    return videos;
  }

  public async findOne(id: number): Promise<Video> {
    const video = await this.videosRepository.findOne(id);

    if (!video) {
      throw new NotFoundException();
    }

    return video;
  }

  public async findOneItem(id: number): Promise<VideoItem> {
    const item = await this.videoItemsRepository.findOne(id);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  public async update(
    id: number,
    updateVideoDto: UpdateVideoDto,
  ): Promise<Video> {
    const video: Video = await this.findOne(id);

    const title = updateVideoDto.title ? updateVideoDto.title : video.title;
    const genre = updateVideoDto.genre ? updateVideoDto.genre : video.genre;
    const director = updateVideoDto.director
      ? updateVideoDto.director
      : video.director;
    const price = updateVideoDto.price ? updateVideoDto.price : video.price;

    const update: Video = this.videosRepository.create({
      id: video.id,
      title,
      genre,
      director,
      price,
    });

    const updated: Video = await this.videosRepository.save(update);

    return updated;
  }

  public async remove(id: number): Promise<Video> {
    const video = await this.videosRepository.findOne(id);

    const removed = await this.videosRepository.remove(video);

    return removed;
  }

  public async removeItem(id: number): Promise<VideoItem> {
    const item = await this.findOneItem(id);

    const removed = await this.videoItemsRepository.remove(item);

    return removed;
  }
}
