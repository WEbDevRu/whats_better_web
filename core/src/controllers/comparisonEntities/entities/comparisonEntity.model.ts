import {
    Field,
    Int,
    ID,
    EnumOptions,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql';
import { ComparisonEntityType } from '@prisma/client';

@ObjectType()
export class ComparisonEntity {
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

    @Field(type => ComparisonEntityType)
    type: ComparisonEntityType;

    @Field()
    link: string;
}