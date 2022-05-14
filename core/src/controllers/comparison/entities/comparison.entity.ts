export class ComparisonEntity {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;

    constructor(partial: Partial<ComparisonEntity>) {
        Object.assign(this, partial);
    }
}