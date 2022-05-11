import { Global, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaPostgres } from './providers/database/prismaPostres';
import { AdminModule } from './controllers/admin/admin.module';
import { ComparisonCategoryModule } from './controllers/comparisonCategory/comparisonCategory.module';
import { ComparisonEntitiesModule } from './controllers/comparisonEntities/comparisonEntities.module';
import { AuthModule } from './controllers/admin/auth/auth.module';
import { VARS } from './config/vars';
import { JwtAuthGuard } from './middlewares/guards/jwt-auth.guard';
import { JwtStrategy } from './middlewares/guards/jwt.strategy';
import { AdminRepository } from './datasource/admin/adminRepository';
import { ComparisonCategoryResolver } from './controllers/comparisonCategory/comparisonCategory.resolver';
import { ComparisonCategoryRepository } from './datasource/comparisonCategory/comparisonCategory.repository';
import { ComparisonEntityResolver } from './controllers/comparisonEntities/comparisonEntity/comparisonEntity.resolver';
import { ComparisonEntityRepository } from './datasource/comparisionEntity/comparisonEntity.repository';
import { ComparisonEntityCategoryResolver } from './controllers/comparisonEntities/categories/categories.resolver';
import { ComparisonEntityCategoryRepository } from './datasource/comparisionEntity/comparisonEntityCategory.repository';

@Global()
@Module({
    imports: [
        PassportModule,
        AdminModule,
        AdminRepository,
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
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
    ],
    controllers: [],
    providers: [
        PrismaPostgres,
        JwtModule,
        JwtAuthGuard,
        JwtStrategy,
        AdminRepository,
        ComparisonCategoryRepository,
        ComparisonCategoryResolver,
        ComparisonEntityResolver,
        ComparisonEntityRepository,
        ComparisonEntityCategoryResolver,
        ComparisonEntityCategoryRepository,
    ],
    exports: [
        PrismaPostgres,
        JwtModule,
        PassportModule,
        JwtAuthGuard,
        JwtStrategy,
        AdminRepository,
        ComparisonCategoryRepository,
        ComparisonEntityRepository,
        ComparisonEntityCategoryResolver,
        ComparisonEntityCategoryRepository,
    ],
})
export class AppModule {}
