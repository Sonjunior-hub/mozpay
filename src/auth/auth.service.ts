import {
  Injectable,
  ConflictException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dto/register.dto';

import { UsersService } from '../users/users.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class AuthService {

  constructor(

    private usersService: UsersService,

    private walletService: WalletService,

  ) {}

  async register(dto: RegisterDto) {

    const exists = await this.usersService.findByEmail(dto.email);

    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    await this.walletService.create(user.id);

    const { password, ...userWithoutPassword } = user;

    return {
      message: 'User created successfully',
      user: userWithoutPassword,
    };
  }
}