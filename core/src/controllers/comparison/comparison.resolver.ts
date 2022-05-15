import {
    Resolver,
    ResolveField,
    Args,
    Query, Parent,
} from '@nestjs/graphql';
import { forwardRef, Inject } from '@nestjs/common';
import { ComparisonRepository } from '../../datasource/comparison/comparison.repository';
import { ComparisonCategory } from '../comparisonCategory/entities/comparisonCategory.model';
import { Comparison } from './entities/comparison.model';
import { ComparisonEntityCategory } from '../comparisonEntities/entities/comparisonEntityCategory.model';
import { ComparisonEntity } from '../comparisonEntities/entities/comparisonEntity.model';

@Resolver(of => Comparison)
export class ComparisonResolver {
    constructor(
        @Inject(forwardRef(() => ComparisonRepository))
        private readonly comparisonRepository: ComparisonRepository,
    ) {}

    @Query(returns => Comparison)
    async getComparison(@Args('id', ) id: string) {
        const result = await this.comparisonRepository.getComparisonById({ id });
        return result;
    }

    @Query(returns => [Comparison])
    async queryComparison(
        @Args('page', ) page?: number,
        @Args('limit', ) limit?: number
    ) {
        const result = await this.comparisonRepository.getComparisonWithPagination({
            page: page || 1,
            limit: limit || 1000,
        });

        return result.items;
    }

    @ResolveField('category', returns => ComparisonCategory)
    async categories(@Parent() comparison:Comparison) {
        const { id } = comparison;

        const result = await this.comparisonRepository.getComparisonCategory({
            id: id,
        });

        return result.category;
    }

    @ResolveField('comparisonEntities', returns => [ComparisonEntity])
    async comparisonEntities(@Parent() comparisonEntity:ComparisonEntity) {
        const { id } = comparisonEntity;

        const result = await this.comparisonRepository.getComparisonEntitiesByComparison({
            comparisonId: id,
        });

        return result.comparisonEntities;
    }
}