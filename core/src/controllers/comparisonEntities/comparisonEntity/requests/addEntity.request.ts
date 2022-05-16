import {
    IsNotEmpty,
    IsEnum,
    IsString,
    IsArray,
} from 'class-validator';
import { ComparisonEntityTypes } from '../../../../common/const/types/ComparisonEntity';

export class AddEntityRequest {
    @IsNotEmpty()
    title: string;

    @IsEnum(ComparisonEntityTypes)
    type: string;

    @IsString()
    link: string;

    @IsArray()
    categories: string;
}

export interface IAddEntity {
    title: string;
    description?: string;
    type: ComparisonEntityTypes;
    link: string;
    categories: string[];
}