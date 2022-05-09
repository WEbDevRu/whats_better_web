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

@Injectable()
export class ComparisonEntityService {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityRepository))
        private readonly comparisonEntityRepository: ComparisonEntityRepository,
    ) {}

    async addEntity ({
        title, type, description, link, 
    }:IAddEntity) {
        return this.comparisonEntityRepository.addComparisonEntity({
            title,
            type,
            description,
            link,
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
        }
    }
}
