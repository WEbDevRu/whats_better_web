import {
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import {
    ComparisonCategoryRepository,
} from '../../datasource/comparisonCategory/comparisonCategory.repository';
import { UserRoles } from '../../common/const/USER_ROLES';
import { ICreateCategoryRequest } from './requests/createCategory.request';
import { ILoadCategoriesRequest } from './requests/loadCategories.request';

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
        console.log(list);
        return {
            ...list,
            page,
            limit,
        };
    }

}
