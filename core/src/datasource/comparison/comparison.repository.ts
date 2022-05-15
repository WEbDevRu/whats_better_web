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

    async getComparisonWithPagination({
        page,
        limit,
    }:{
        page: number,
        limit: number,
    }) {
        const result = await this.prismaService.$transaction([
            this.prismaService.comparision.findMany({
                skip: (page - 1)*limit,
                take: limit,
            }),
            this.prismaService.comparision.count(),
        ]);

        return {
            items: result[0],
            totalItems: result[1],
        };
    }

    async getComparisonById({
        id,
    }: { id: string }) {
        return this.prismaService.comparision.findFirst({
            where: {
                id,
            },
        });
    }

    async getComparisonCategory({
        id,
    }: { id: string }) {
        return this.prismaService.comparision.findFirst({
            where: {
                id,
            },
            include: {
                category: true,
            },
        });
    }

    async getComparisonEntitiesByComparison({
        comparisonId,
    }: { comparisonId: string }){
        console.log(comparisonId);
        return this.prismaService.comparision.findFirst({
            where: {
                id: comparisonId,
            },
            include: {
                comparisonEntities: true,
            },
        });
    }
}
