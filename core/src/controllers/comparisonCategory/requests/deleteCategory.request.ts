import {
    IsArray,
    IsUUID,
} from 'class-validator';

export class DeleteCategoryRequest {
    @IsUUID()
    id: string;
}

export interface IDeleteCategory {
    id: string
}