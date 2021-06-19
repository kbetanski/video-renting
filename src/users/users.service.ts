import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/enums/role.enum';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async register(createUserDto: CreateUserDto): Promise<User> {
    const search = await this.usersRepository.find({
      where: { username: createUserDto.username },
    });

    if (search.length !== 0) {
      throw new BadRequestException('Username already in use');
    }

    const salt = bcrypt.genSaltSync(10);

    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create(createUserDto);
    user.role = Role.User;

    return await this.usersRepository.save(user);
  }

  public async changePassword(
    changePasswordUserDto: ChangePasswordUserDto,
    username: string,
  ): Promise<User> {
    const user = await this.findByUsername(username);

    const salt = bcrypt.genSaltSync(10);
    const newPassword = await bcrypt.hash(
      changePasswordUserDto.newPassword,
      salt,
    );

    user.password = newPassword;

    return await this.usersRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    const users: User[] = await this.usersRepository.find();

    return users;
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    return user;
  }

  public async remove(id: number): Promise<boolean> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException('User does not exist already');
    }

    await this.usersRepository.delete(user.id);

    return true;
  }
}
