import { Module } from '@nestjs/common';
import { PrismaPostgres } from './providers/database/prismaPostres';

@Module({
    imports: [],
    controllers: [],
    providers: [
        PrismaPostgres,
    ],
})
export class AppModule {}
