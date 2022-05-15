import {
    Field,
    Int,
    ID,
    ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class ComparisonEntityCategory {
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