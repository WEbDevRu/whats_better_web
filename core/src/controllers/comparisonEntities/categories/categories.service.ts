import {
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import {
    ComparisonEntityCategoryRepository,
} from '../../../datasource/comparisionEntity/comparisonEntityCategory.repository';
import { IAddEntityCategory } from './requests/addEntityCategory.request';
import { IEditEntityCategory } from './requests/editEnitityCategory.request';
import { IDeleteEntityCategory } from './requests/deleteEntityCategory.request';
import { ILoadEntityCategoriesRequest } from './requests/loadEntityCategories.request';


@Injectable()
export class ComparisonEntityCategoryService {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityCategoryRepository))
        private readonly comparisonEntityCategoryRepository: ComparisonEntityCategoryRepository,
    ) {}

    async addEntityCategory({ name, description }:IAddEntityCategory) {
        return this.comparisonEntityCategoryRepository.addEntityCategory({
            name,
            description,
        });
    }

    async editEntityCategory({ entityCategoryId, name, description }:IEditEntityCategory) {
        return this.comparisonEntityCategoryRepository.updateComparisonEntityCategoryById({
            entityCategoryId,
            name,
            description,
        });
    }

    async deleteEntityCategory({ entityCategoryId }:IDeleteEntityCategory) {
        return this.comparisonEntityCategoryRepository.removeComparisonEntityCategoryById({
            entityCategoryId,
        });
    }

    async loadEntityCategories({ page, limit }:ILoadEntityCategoriesRequest) {
        const list = this.comparisonEntityCategoryRepository.getComparisonEntityCategoriesWithPagination({
            page,
            limit,
        });

        return {
            ...list,
            page,
            limit,
        };
    }
}
