import {
    IsNotEmpty,
    IsEnum, IsString,
} from 'class-validator';
import { ComparisonEntityType } from '@prisma/client';

export class AddEntityRequest {
    @IsNotEmpty()
    title: string;

    @IsEnum(ComparisonEntityType)
    type: string;

    @IsString()
    link: string;
}

export interface IAddEntity {
    title: string;
    description?: string;
    type: ComparisonEntityType;
    link: string;
}