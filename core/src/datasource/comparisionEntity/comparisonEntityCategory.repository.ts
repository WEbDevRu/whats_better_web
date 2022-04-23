import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class ComparisonEntityCategoryRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

    async addEntityCategory(
        {
            name,
            description,
        }:{
            name: string,
            description: string
        }
    ) {
        return this.prismaService.comparisonEntityCategory.create({
            data: {
                title: name,
                description,
            },
        });
    }

    async removeComparisonEntityCategoryById({
        entityCategoryId,
    }: {
        entityCategoryId:string
    }) {
        return this.prismaService.comparisonEntityCategory.delete({
            where: {
                id: entityCategoryId,
            },
        });
    }

    async getComparisonEntityCategoriesWithPagination({
        page,
        limit,
    }:{
        page: number,
        limit: number,
    }) {
        const result = await this.prismaService.$transaction([
            this.prismaService.comparisonEntityCategory.findMany({
                skip: (page - 1)*limit,
                take: limit,
            }),
            this.prismaService.comparisonEntityCategory.count(),
        ]);

        return {
            items: result[0],
            totalItems: result[1],
        };
    }

    async updateComparisonEntityCategoryById({
        entityCategoryId,
        name,
        description,
    }:{
        entityCategoryId: string,
        name?: string,
        description?: string,
    }) {
        const updateObject:Record<string, string> = {};

        if (name) {
            updateObject.title = name;
        }

        if (description) {
            updateObject.description = description;
        }

        return this.prismaService.comparisonEntityCategory.update({
            where: {
                id: entityCategoryId,
            },
            data: updateObject,
        });
    }
}
