import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateComparisonRequest {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    categoryId: string;

    @IsArray()
    comparisonsId: string[];
}

export interface ICreateComparisonRequest {
    title: string,
    description?: string,
    comparisonsId: string[],
    categoryId: string,
}