import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateComparisonRequest {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    categoryId: string;

    @IsArray()
    entitiesId: string[];
}

export interface ICreateComparisonRequest {
    title: string,
    description?: string,
    entitiesId: string[],
    categoryId: string,
}