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

@Injectable()
export class ComparisonCategoryService {
    constructor(
        @Inject(forwardRef(() => ComparisonCategoryRepository))
        private readonly comparisonCategoryRepository: ComparisonCategoryRepository,
    ) {}

    async addCategory({ title, description }:ICreateCategoryRequest) {
        const adminData = await this.comparisonCategoryRepository.addCategory({
            title: title,
            description: description, 
        });

        console.log(adminData);

        return adminData;
    }

}
