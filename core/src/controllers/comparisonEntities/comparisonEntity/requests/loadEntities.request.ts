import {
    IsInt,
    Min,
    Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
    START_PAGE_NUMBER,
    MAX_PAGE_SIZE_DEFAULT,
} from '../../../../common/const/PAGINATION';

export class LoadEntityRequest {
    @IsInt()
    @Min(START_PAGE_NUMBER)
    @Type(() => Number)
    page: number;

    @IsInt()
    @Min(1)
    @Max(MAX_PAGE_SIZE_DEFAULT)
    @Type(() => Number)
    limit: number;
}

export interface ILoadEntityRequest {
    page: number,
    limit: number,
}