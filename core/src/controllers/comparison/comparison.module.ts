import { Module } from '@nestjs/common';
import { ComparisonController } from './comparison.controller';
import { ComparisonService } from './comparison.service';
import { ParseIntPipe } from  '../../middlewares/parse-int.pipe';

@Module({
    imports: [],
    controllers: [ComparisonController],
    providers: [
        ComparisonService,
        ParseIntPipe,
    ],
    exports: [],
})
export class ComparisonModule {}
