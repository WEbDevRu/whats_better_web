import { IsNotEmpty } from 'class-validator';

export class CreateCategoryRequest {
    @IsNotEmpty()
    title: string;
}

export interface ICreateCategoryRequest {
    title: string,
    description: string,
}