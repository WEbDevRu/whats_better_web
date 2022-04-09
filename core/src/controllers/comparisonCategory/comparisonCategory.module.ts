import { Module } from '@nestjs/common';
import { ComparisonCategoryController } from './comparisonCategory.controller';
import { ComparisonCategoryService } from './comparisonCategory.service';
import {
    ComparisonCategoryRepository,
} from '../../datasource/comparisonCategory/comparisonCategory.repository';
import { ParseIntPipe } from  '../../middlewares/parse-int.pipe';

@Module({
    imports: [],
    controllers: [ComparisonCategoryController],
    providers: [
        ComparisonCategoryService,
        ComparisonCategoryRepository,
        ParseIntPipe,
    ],
    exports: [ComparisonCategoryService],
})
export class ComparisonCategoryModule {}
