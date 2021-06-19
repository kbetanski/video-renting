import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

type loginResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }

  public login(user: User): loginResponse {
    const token = this.jwtService.sign({
      username: user.username,
      id: user.id,
      email: user.email,
    });

    return { access_token: token };
  }
}
