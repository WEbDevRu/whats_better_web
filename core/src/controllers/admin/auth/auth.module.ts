import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminRepository } from '../../../datasource/admin/adminRepository';

import { LocalStrategy } from '../../../middlewares/guards/admin/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        AdminRepository,
        LocalStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
