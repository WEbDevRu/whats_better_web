import { Module } from '@nestjs/common';
import { ComparisonCategoryController } from './comparisonCategory.controller';
import { ComparisonCategoryService } from './comparisonCategory.service';

@Module({
    imports: [],
    controllers: [ComparisonCategoryController],
    providers: [
        ComparisonCategoryService,
    ],
    exports: [],
})
export class ComparisonCategory {}
