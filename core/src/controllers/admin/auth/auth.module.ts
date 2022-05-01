import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from '../../../middlewares/guards/local.strategy';
import { JwtAuthGuard } from '../../../middlewares/guards/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../../middlewares/guards/jwt.strategy';

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtAuthGuard,
        JwtStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
