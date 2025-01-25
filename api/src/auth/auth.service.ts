import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { FindUserDto } from '../users/dto/find-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(profile: any): Promise<any> {
    const createUserPayload: FindUserDto = {
      email: profile.emails[0].value,
      googleId: profile.id,
    };

    const foundUser = await this.usersService.find(createUserPayload);

    if (foundUser) {
      return foundUser;
    }

    const newUser = await this.usersService.create({
      name: `${profile.name.givenName} ${profile.name.familyName}`.trim(),
      email: profile.emails[0].value,
      googleId: profile.id,
    });

    return newUser;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: 'HS256',
      }),
    };
  }

  async validateToken(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }

  async refreshToken(oldToken: string) {
    try {
      const decoded = this.jwtService.verify(oldToken, {
        ignoreExpiration: true,
      });
      const payload = { username: decoded.username, sub: decoded.sub };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch {
      throw new Error('Invalid token');
    }
  }
}
