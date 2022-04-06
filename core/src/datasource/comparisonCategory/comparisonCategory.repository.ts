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
}
