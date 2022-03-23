import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class AdminPostgresRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

}
