import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class ComparisonEntityRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

}
