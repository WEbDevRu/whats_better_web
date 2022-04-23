import {
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import {
    ComparisonEntityRepository,
} from '../../../datasource/comparisionEntity/comparisonEntity.repository';
import { IAddEntityCategory } from './requests/addEntityCategory.request';
import { IEditEntityCategory } from './requests/editEnitityCategory.request';
import { IDeleteEntityCategory } from './requests/deleteEntityCategory.request';
import { ILoadEntityCategoriesRequest} from './requests/loadEntityCategories.request';


@Injectable()
export class ComparisonEntityService {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityRepository))
        private readonly comparisonEntityRepository: ComparisonEntityRepository,
    ) {}

    async addEntityCategory({ name, description }:IAddEntityCategory) {

    }

    async editEntityCategory({ entityCategoryId, name, description }:IEditEntityCategory) {

    }

    async deleteEntityCategory({ entityCategoryId }:IDeleteEntityCategory) {

    }

    async loadEntityCategories({ page, limit }:ILoadEntityCategoriesRequest) {

    }
}
