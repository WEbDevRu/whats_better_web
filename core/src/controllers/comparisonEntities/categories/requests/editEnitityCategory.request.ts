import {
    IsNotEmpty,
    IsUUID,
} from 'class-validator';

export class EditEntityCategoryRequest {
    @IsNotEmpty()
    name: string;
}

export class EditEntityCategoryParamsRequest {
    @IsUUID()
    entityCategoryId: string;
}

export interface IEditEntityCategory {
    entityCategoryId: string
    name: string
    description: string
}