import { Module } from '@nestjs/common';
import { ComparisonEntityModule } from './comparisonEntity/comparisonEntity.module';
import { ComparisonEntityCategoryModule } from './categories/categories.module';

@Module({
    imports: [ComparisonEntityModule, ComparisonEntityCategoryModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class ComparisonEntitiesModule {}
