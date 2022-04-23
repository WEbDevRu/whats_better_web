import {
    IsUUID,
} from 'class-validator';

export class DeleteEntityCategoryRequest {
    @IsUUID()
    entityCategoryId: string;
}

export interface IDeleteEntityCategory {
    entityCategoryId: string
}