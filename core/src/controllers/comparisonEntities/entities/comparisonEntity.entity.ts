import { ComparisonEntityType } from '@prisma/client';

export class ComparisonEntity {
    id: string;
    title: string;
    description: string;
    type: ComparisonEntityType;
    link: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<ComparisonEntity>) {
        Object.assign(this, partial);
    }
}