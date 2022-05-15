import {
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import {
    ComparisonRepository,
} from '../../datasource/comparison/comparison.repository';
import { ICreateComparisonRequest } from './requests/createComparison';

@Injectable()
export class ComparisonService {
    constructor(
        @Inject(forwardRef(() => ComparisonRepository))
        private readonly comparisonRepository: ComparisonRepository,
    ) {}

    async addComparison({
        title,
        description,
        categoryId,
        entitiesId,
    }:ICreateComparisonRequest) {
        return this.comparisonRepository.addComparison({
            title,
            description,
            comparisonEntitiesId: entitiesId,
            categoryId,
        });
    }
}
