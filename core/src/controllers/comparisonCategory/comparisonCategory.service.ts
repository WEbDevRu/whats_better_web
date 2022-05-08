import {
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import {
    ComparisonCategoryRepository,
} from '../../datasource/comparisonCategory/comparisonCategory.repository';
import { ICreateCategoryRequest } from './requests/createCategory.request';
import { ILoadCategoriesRequest } from './requests/loadCategories.request';
import { IDeleteCategory } from './requests/deleteCategory.request';

@Injectable()
export class ComparisonCategoryService {
    constructor(
        @Inject(forwardRef(() => ComparisonCategoryRepository))
        private readonly comparisonCategoryRepository: ComparisonCategoryRepository,
    ) {}

    async addCategory({ title, description }:ICreateCategoryRequest) {
        const categoryData = await this.comparisonCategoryRepository.addCategory({
            title: title,
            description: description, 
        });

        return categoryData;
    }


    async loadCategoriesList({ page, limit }:ILoadCategoriesRequest) {
        const list = await this.comparisonCategoryRepository.getCategoriesWithPagination({
            page,
            limit,
        });

        return {
            ...list,
            page,
            limit,
        };
    }

    async deleteCategory({ id }:IDeleteCategory) {
        const result = await this.comparisonCategoryRepository.deleteCategoryById({
            categoryId: id,
        });

        return result;
    }
}
