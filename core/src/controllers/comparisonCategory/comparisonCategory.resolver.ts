import {
    Resolver,
    ResolveField,
    Args,
    Query,
} from '@nestjs/graphql';
import { ComparisonCategory } from './entities/comparisonCategory.model';
import { forwardRef, Inject } from '@nestjs/common';
import { ComparisonCategoryRepository } from '../../datasource/comparisonCategory/comparisonCategory.repository';

@Resolver(of => ComparisonCategory)
export class ComparisonCategoryResolver {
    constructor(
        @Inject(forwardRef(() => ComparisonCategoryRepository))
        private readonly comparisonCategoryRepository: ComparisonCategoryRepository,
    ) {}

    @Query(returns => ComparisonCategory)
    async getComparisonCategory(@Args('id', ) id: string) {
        const result = await this.comparisonCategoryRepository.getCategoryById({ id });
        return result;
    }

    @Query(returns => [ComparisonCategory])
    async queryComparisonCategory() {
        const result = await this.comparisonCategoryRepository.getCategoriesWithPagination({
            page: 1,
            limit: 1000,
        });

        return result.items;
    }
}