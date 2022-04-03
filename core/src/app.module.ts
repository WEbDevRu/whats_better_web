import { Global, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PrismaPostgres } from './providers/database/prismaPostres';
import { AdminModule } from './controllers/admin/admin.module';
import { AuthModule } from './controllers/admin/auth/auth.module';
import { VARS } from './config/vars';

@Global()
@Module({
    imports: [
        AdminModule,
        RouterModule.register([{
            path: '',
            module: AdminModule,
            children: [{
                path: 'admin',
                module: AuthModule,
            }],
        }]
        ),
        JwtModule.register({
            secret: VARS.jwtSalt,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [],
    providers: [
        PrismaPostgres,
        JwtModule,
    ],
    exports: [
        PrismaPostgres,
        JwtModule,
    ],
})
export class AppModule {}
