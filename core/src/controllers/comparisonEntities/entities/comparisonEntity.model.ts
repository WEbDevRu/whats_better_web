import {
    Field,
    Int,
    ID,
    EnumOptions,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql';
import { ComparisonEntityType } from '../../../common/const/types/ComparisonEntity';

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