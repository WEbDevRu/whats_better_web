import {
    IsNotEmpty,
    IsEnum,
    IsString,
    IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ComparisonEntityType } from '@prisma/client';

export class AddEntityRequest {
    @IsNotEmpty()
    title: string;

    @IsEnum(ComparisonEntityType)
    type: string;

    @IsString()
    link: string;

    @IsArray()
    categories: string;
}

export interface IAddEntity {
    title: string;
    description?: string;
    type: ComparisonEntityType;
    link: string;
    categories: string[];
}