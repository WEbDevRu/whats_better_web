import {
    Resolver,
    ResolveField,
    Args,
    Query,
    Parent, registerEnumType,
} from '@nestjs/graphql';
import { ComparisonEntity } from '../entities/comparisonEntity.model';
import { ComparisonEntityCategory } from '../entities/comparisonEntityCategory.model';
import { forwardRef, Inject } from '@nestjs/common';
import { ComparisonEntityRepository } from '../../../datasource/comparisionEntity/comparisonEntity.repository';
import {
    ComparisonEntityCategoryRepository,
} from '../../../datasource/comparisionEntity/comparisonEntityCategory.repository';
import { ComparisonEntityTypes } from '../../../common/const/types/ComparisonEntity';

registerEnumType(ComparisonEntityTypes, {
    name: 'ComparisonEntityType',
});

@Resolver(of => ComparisonEntity)
export class ComparisonEntityResolver {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityRepository))
        private readonly comparisonEntityRepository: ComparisonEntityRepository,
        @Inject(forwardRef(() => ComparisonEntityCategoryRepository))
        private readonly comparisonEntityCategoryRepository:ComparisonEntityCategoryRepository
    ) {}

    @Query(returns => ComparisonEntity)
    async getComparisonEntity(@Args('id', ) id: string) {
        const result = await this.comparisonEntityRepository.getComparisonEntityById({ id });
        return result;
    }

    @Query(returns => [ComparisonEntity])
    async queryComparisonEntity(
        @Args('page', ) page?: number,
        @Args('limit', ) limit?: number
    ) {
        const result = await this.comparisonEntityRepository.getComparisonEntitiesWithPaginate({
            page: page || 1,
            limit: limit || 1000,
        });

        return result.items;
    }

    @ResolveField('entityCategories', returns => [ComparisonEntityCategory])
    async categories(@Parent() comparisonEntity:ComparisonEntity) {
        const { id } = comparisonEntity;

        const result = await this.comparisonEntityCategoryRepository.getCategoryByComparisonEntity({
            comparisonEntityId: id,
        });

        return result.categories;
    }
}