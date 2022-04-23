import {
    IsInt,
    Min,
    Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
    MAX_PAGE_SIZE_DEFAULT,
    START_PAGE_NUMBER,
} from '../../../../common/const/PAGINATION';

export class LoadEntityCategoriesRequest {
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

export interface ILoadEntityCategoriesRequest {
    page: number,
    limit: number,
}