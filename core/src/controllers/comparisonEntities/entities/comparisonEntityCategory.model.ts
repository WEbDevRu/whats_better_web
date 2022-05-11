import {
    Field,
    Int,
    ID,
    ObjectType,
} from '@nestjs/graphql';
import { ComparisonEntityType } from '@prisma/client';

@ObjectType()
export class ComparisonEntityCategoryModel {
    @Field(type => ID, { nullable: true })
    id: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;

    @Field()
    title: string;

    @Field()
    description: string;
}