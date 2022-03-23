import { Module } from '@nestjs/common';
import { PrismaPostgres } from './providers/database/prismaPostres';
import { AdminModule } from './controllers/admin/admin.module';

@Module({
    imports: [AdminModule],
    controllers: [],
    providers: [
        PrismaPostgres,
    ],
})
export class AppModule {}
