import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    WalletModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),

        signOptions: {
          expiresIn: config.getOrThrow<string>('JWT_EXPIRES_IN') as '1d',
        },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}