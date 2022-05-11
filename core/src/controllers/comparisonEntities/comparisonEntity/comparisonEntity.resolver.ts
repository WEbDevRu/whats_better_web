import {
    Resolver,
    ResolveField,
    Args,
    Query,
    Parent,
} from '@nestjs/graphql';
import { ComparisonEntity } from '../entities/comparisonEntity.model';
import { ComparisonEntityCategoryModel } from '../entities/comparisonEntityCategory.model';
import { forwardRef, Inject } from '@nestjs/common';
import { ComparisonEntityRepository } from '../../../datasource/comparisionEntity/comparisonEntity.repository';
import {
    ComparisonEntityCategoryRepository,
} from '../../../datasource/comparisionEntity/comparisonEntityCategory.repository';

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
    async queryComparisonEntity() {
        const result = await this.comparisonEntityRepository.getComparisonEntitiesWithPaginate({
            page: 1,
            limit: 1000,
        });

        return result.items;
    }

    @ResolveField('entityCategories', returns => [ComparisonEntityCategoryModel])
    async categories(@Parent() comparisonEntity:ComparisonEntity) {
        const { id } = comparisonEntity;
        console.log(id);

        const result = await this.comparisonEntityCategoryRepository.getCategoryByComparisonEntity({
            comparisonEntityId: id,
        });

        return result;
    }
}