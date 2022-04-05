import { IsNotEmpty } from 'class-validator';

export class CreateCategoryRequest {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}

export interface ICreateCategoryRequest {
    name: string,
    description: string,
}