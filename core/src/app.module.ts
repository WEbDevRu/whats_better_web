import { Global, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { PrismaPostgres } from './providers/database/prismaPostres';
import { AdminModule } from './controllers/admin/admin.module';
import { AuthModule } from './controllers/admin/auth/auth.module';

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
    ],
    controllers: [],
    providers: [
        PrismaPostgres,
    ],
    exports: [
        PrismaPostgres,
    ],
})
export class AppModule {}
