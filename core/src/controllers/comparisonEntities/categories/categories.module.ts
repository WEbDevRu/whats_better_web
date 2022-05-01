import { Module } from '@nestjs/common';
import { ComparisonEntityCategoryController } from './categories.controller';
import { ComparisonEntityCategoryService } from './categories.service';
import {
    ComparisonEntityCategoryRepository  ,
} from '../../../datasource/comparisionEntity/comparisonEntityCategory.repository';

@Module({
    imports: [],
    controllers: [ComparisonEntityCategoryController],
    providers: [
        ComparisonEntityCategoryService ,
        ComparisonEntityCategoryRepository,
    ],
    exports: [ComparisonEntityCategoryService],
})
export class ComparisonEntityCategoryModule {}
