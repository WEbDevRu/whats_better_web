import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class ComparisonCategoryRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}
}
