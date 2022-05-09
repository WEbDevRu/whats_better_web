import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';
import { ComparisonEntityType } from '@prisma/client';

@Injectable()
export class ComparisonEntityRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

    async addComparisonEntity({
        title,
        description,
        type,
        link,
    }: {
        title: string,
        description?: string,
        type: ComparisonEntityType,
        link: string,
    }) {
        return this.prismaService.comparisonEntity.create({
            data: {
                title,
                description,
                type,
                link,
            },
        });
    }

    async getComparisonEntitiesWithPaginate({
        page,
        limit,
    }: {
        page: number,
        limit: number,
    }) {
        const result = await this.prismaService.$transaction([
            this.prismaService.comparisonEntity.findMany({
                skip: (page - 1)*limit,
                take: limit,
            }),
            this.prismaService.comparisonEntity.count(),
        ]);

        return {
            items: result[0],
            totalItems: result[1],
        };
    }
}
