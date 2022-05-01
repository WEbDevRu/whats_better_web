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
}
