import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class ComparisonCategoryRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

    async addCategory({
        title,
        description,
    }: {
        title: string,
        description: string,
    }) {
        return this.prismaService.comparisonCategory.create({
            data: {
                title: title,
                description: description,
            },
        });
    }

    async getCategoriesWithPagination({
        page,
        limit,
    }:{
        page: number,
        limit: number,
    }) {
        const result = await this.prismaService.$transaction([
            this.prismaService.comparisonCategory.findMany({
                skip: (page - 1)*limit,
                take: limit,
            }),
            this.prismaService.comparisonCategory.count(),
        ]);

        return {
            items: result[0],
            totalItems: result[1],
        };
    }

    async getCategoryById({
        id,
    }:{ id: string }) {
        return this.prismaService.comparisonCategory.findFirst({
            where: {
                id,
            },
        });
    }

    async deleteCategoryById({
        categoryId,
    }:{
        categoryId: string
    }) {
        return this.prismaService.comparisonCategory.delete({
            where: {
                id: categoryId,
            },
        });
    }

    async searchByTitleAndDescription({
        text,
    }) {
        const clearedText = text.replace(/\+/g, ' ');

        return this.prismaService.comparisonCategory.findMany({
            where: {
                title: {
                    search: clearedText,
                },
                description: {
                    search: clearedText,
                },
            },
        });
    }

    async getCategoryComparisons({
        categoryId,
    }:{ categoryId: string }) {
        return this.prismaService.comparisonCategory.findFirst({
            where: {
                id: categoryId,
            },
            include: {
                Comparision: true,
            },
        });
    }
}
