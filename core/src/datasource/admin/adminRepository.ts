import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';

@Injectable()
export class AdminRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

    async findAdminByEmail({ email }:{
        email: string,
    }) {
        console.log(email);
        return this.prismaService.admin.findFirst({
            where: {
                email: email,
            },
        });
    }
}
