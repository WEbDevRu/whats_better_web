import {
    Field,
    ID,
    ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class ComparisonModel {
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