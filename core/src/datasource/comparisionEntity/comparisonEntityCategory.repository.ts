import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class ComparisonEntityCategoryRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

}
