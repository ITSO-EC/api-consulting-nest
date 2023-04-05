import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { comparePassword } from 'src/commons/utils/bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/entities/user.roles';
import { JwtPayload, sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async getMe(user: User): Promise<User> {
    return user;
  }

  async login(signInDto: SignInDto) {
    const user = await this.validate(signInDto);
    const token = await this.signPayload({ email: user.email });

    return {
      massage: 'Login Success!',
      status: HttpStatus.CREATED,
      token: token,
    };
  }

  async signPayload(payload: JwtPayload) {
    return sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '7D',
    });
  }
  async validateUser(payload: JwtPayload) {
    const { email } = payload;
    return await this.usersService.findByParams({ email });
  }

  async validate(signInDto: SignInDto): Promise<User> {
    const user = await this.usersService.findByParams({
      email: signInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = comparePassword(signInDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async register(createUserDto: CreateUserDto) {
    createUserDto.role = UserRole.USER;
    const user = await this.usersService.create(createUserDto);
    const token = await this.signPayload({ email: user.email });
    return {
      massage: 'Register Success!',
      data: user,
      status: HttpStatus.CREATED,
      token: token,
    };
  }
}
