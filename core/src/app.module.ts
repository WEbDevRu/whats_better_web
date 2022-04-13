import { Global, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaPostgres } from './providers/database/prismaPostres';
import { AdminModule } from './controllers/admin/admin.module';
import { ComparisonCategoryModule } from './controllers/comparisonCategory/comparisonCategory.module';
import { ComparisonEntitiesModule } from './controllers/comparisonEntities/comparisonEntities.module';
import { AuthModule } from './controllers/admin/auth/auth.module';
import { VARS } from './config/vars';
import { JwtAuthGuard } from './middlewares/guards/jwt-auth.guard';
import { JwtStrategy } from './middlewares/guards/jwt.strategy';

@Global()
@Module({
    imports: [
        PassportModule,
        AdminModule,
        ComparisonCategoryModule,
        ComparisonEntitiesModule,
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
        JwtAuthGuard,
        JwtStrategy,
    ],
    exports: [
        PrismaPostgres,
        JwtModule,
        PassportModule,
        JwtAuthGuard,
        JwtStrategy,
    ],
})
export class AppModule {}
