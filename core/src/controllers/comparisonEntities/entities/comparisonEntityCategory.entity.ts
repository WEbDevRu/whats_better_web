export class ComparisonEntityCategoryEntity {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<ComparisonEntityCategoryEntity>) {
        Object.assign(this, partial);
    }
}