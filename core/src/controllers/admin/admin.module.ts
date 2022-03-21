import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [],
    controllers: [],
    providers: [AuthModule],
})
export class AdminModule {}
