export class ComparisonCategoryEntity {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<ComparisonCategoryEntity>) {
        Object.assign(this, partial);
    }
}