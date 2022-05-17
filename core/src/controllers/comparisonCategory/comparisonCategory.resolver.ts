import {
    Resolver,
    ResolveField,
    Args,
    Query, Parent,
} from '@nestjs/graphql';
import { ComparisonCategory } from './entities/comparisonCategory.model';
import { forwardRef, Inject } from '@nestjs/common';
import { ComparisonCategoryRepository } from '../../datasource/comparisonCategory/comparisonCategory.repository';
import { Comparison } from '../comparison/entities/comparison.model';

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

    @ResolveField('comparisons', returns => [ Comparison])
    async comparisonEntities(@Parent() comparison: Comparison) {
        const { id } = comparison;

        const result = await this.comparisonCategoryRepository.getCategoryComparisons({
            categoryId: id,
        });

        return result.Comparision;
    }
}
