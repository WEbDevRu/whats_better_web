import {
    Resolver,
    ResolveField,
    Args,
    Query,
} from '@nestjs/graphql';
import { ComparisonEntityCategory } from '../entities/comparisonEntityCategory.model';
import { forwardRef, Inject } from '@nestjs/common';
import {
    ComparisonEntityCategoryRepository,
} from '../../../datasource/comparisionEntity/comparisonEntityCategory.repository';
import { ComparisonCategory } from '../../comparisonCategory/entities/comparisonCategory.model';

@Resolver(of => ComparisonCategory)
export class ComparisonEntityCategoryResolver {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityCategoryRepository))
        private readonly comparisonEntityCategoryRepository: ComparisonEntityCategoryRepository,
    ) {}

    @Query(returns => [ComparisonEntityCategory])
    async queryComparisonEntityCategory() {
        const result = await this.comparisonEntityCategoryRepository.getComparisonEntityCategoriesWithPagination({
            page: 1,
            limit: 1000,
        });

        return result.items;
    }
}