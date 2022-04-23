import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class ComparisonEntityRepository {
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
}
