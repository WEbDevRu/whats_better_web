import {
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import {
    ComparisonEntityRepository,
} from '../../../datasource/comparisionEntity/comparisonEntity.repository';
import { ILoadEntityRequest } from './requests/loadEntities.request';
import { IAddEntity } from './requests/addEntity.request';
import { PrismaPostgres } from '../../../providers/database/prismaPostres';

@Injectable()
export class ComparisonEntityService {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityRepository))
        private readonly comparisonEntityRepository: ComparisonEntityRepository
    ) {}

    async addEntity ({
        title,
        type,
        description,
        link,
        categories,
    }:IAddEntity) {
        return this.comparisonEntityRepository.addComparisonEntity({
            title,
            type,
            description,
            link,
            categories: categories.map((category) => ({
                comparisonEntityCategoryId: category,
            })),
        });
    }

    async loadEntities({ page, limit }:ILoadEntityRequest) {
        const list = await this.comparisonEntityRepository.getComparisonEntitiesWithPaginate({
            page,
            limit, 
        });
        
        return {
            ...list,
            page,
            limit,
        };
    }

    async searchEntities({ text }:{ text:string }) {
        return this.comparisonEntityRepository.searchByTitleAndDescription({ text });
    }
}
