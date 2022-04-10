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
        return this.prismaService.comparisionCategory.create({
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
            this.prismaService.comparisionCategory.findMany({
                skip: (page - 1)*limit,
                take: limit,
            }),
            this.prismaService.comparisionCategory.count(),
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
        return this.prismaService.comparisionCategory.delete({
            where: {
                id: categoryId,
            }, 
        });
    }
}
