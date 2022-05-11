import { Module } from '@nestjs/common';
import { ComparisonCategoryController } from './comparisonCategory.controller';
import { ComparisonCategoryService } from './comparisonCategory.service';
import { ParseIntPipe } from  '../../middlewares/parse-int.pipe';

@Module({
    imports: [],
    controllers: [ComparisonCategoryController],
    providers: [
        ComparisonCategoryService,
        ParseIntPipe,
    ],
    exports: [],
})
export class ComparisonCategoryModule {}
