import { Module } from '@nestjs/common';
import { ComparisonCategoryController } from './comparisonCategory.controller';
import { ComparisonCategoryService } from './comparisonCategory.service';
import {
    ComparisonCategoryRepository,
} from '../../datasource/comparisonCategory/comparisonCategory.repository';

@Module({
    imports: [],
    controllers: [ComparisonCategoryController],
    providers: [
        ComparisonCategoryService,
        ComparisonCategoryRepository,
    ],
    exports: [ComparisonCategoryService],
})
export class ComparisonCategoryModule {}
