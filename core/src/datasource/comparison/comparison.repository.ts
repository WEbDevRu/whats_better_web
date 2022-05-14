import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class ComparisonRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

    async addComparison({
        title,
        description,
    }: {
        title: string,
        description?: string,
        comparisonEntities?: {
            comparisonEntitiesId
        }[]
    }) {

    }
}
