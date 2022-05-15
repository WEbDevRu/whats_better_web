import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class ComparisonRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

    async addComparison({
        title,
        description,
        categoryId,
        comparisonEntitiesId,
    }: {
        title: string,
        description?: string,
        categoryId: string,
        comparisonEntitiesId: string[]
    }) {
        console.log(comparisonEntitiesId);
        return this.prismaService.comparision.create({
            data: {
                title,
                description,
                categoryId,
                comparisonEntities: {
                    connect: comparisonEntitiesId.map((id) => ({
                        id: id,
                    })),
                },
            },
        });
    }
}
