import {
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import {
    ComparisonEntityRepository,
} from '../../../datasource/comparisionEntity/comparisonEntity.repository';

@Injectable()
export class ComparisonEntityService {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityRepository))
        private readonly comparisonEntityRepository: ComparisonEntityRepository,
    ) {}
}
