import { IsInt, IsString } from 'class-validator';

export class LoadCategoriesRequest {
    @IsString()
    page: number;

    @IsString()
    limit: number;
}

export interface ILoadCategoriesRequest {
    page: number,
    limit: number,
}