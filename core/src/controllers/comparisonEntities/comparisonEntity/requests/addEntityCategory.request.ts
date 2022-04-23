import {
    IsNotEmpty,
} from 'class-validator';

export class AddEntityCategoryRequest {
    @IsNotEmpty()
    name: string;
}

export interface IAddEntityCategory {
    name: string
    description: string
}