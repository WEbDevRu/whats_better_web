import {
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import {
    ComparisonEntityCategoryRepository,
} from '../../../datasource/comparisionEntity/comparisonEntityCategory.repository';


@Injectable()
export class ComparisonEntityCategoryService {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityCategoryRepository))
        private readonly comparisonEntityCategoryRepository: ComparisonEntityCategoryRepository,
    ) {}

}
