import { Module } from '@nestjs/common';
import { ComparisonEntityController } from './comparisonEntity.controller';
import { ComparisonEntityService } from './comparisonEntity.service';
import {
    ComparisonEntityRepository,
} from '../../../datasource/comparisionEntity/comparisonEntity.repository';

@Module({
    imports: [],
    controllers: [ComparisonEntityController],
    providers: [
        ComparisonEntityService ,
        ComparisonEntityRepository,
    ],
    exports: [ComparisonEntityService],
})
export class ComparisonEntityModule {}
