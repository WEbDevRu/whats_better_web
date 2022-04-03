import { Injectable } from '@nestjs/common';
import { PrismaPostgres } from '../../providers/database/prismaPostres';
import { AdminEntity } from '../../controllers/admin/entities/admin.entity';

@Injectable()
export class AdminRepository {
    constructor(private readonly prismaService: PrismaPostgres) {}

    async findAdminByEmail({ email }:{
        email: string,
    }) {
        return this.prismaService.admin.findFirst({
            where: {
                email: email,
            },
        });
    }

    async findByAdminId({ adminId }):Promise<AdminEntity> {
        return this.prismaService.admin.findFirst({
            where: {
                id: adminId,
            },
        });
    }

    async addAdminTokenSession({ adminId, refreshToken }:{
        adminId: string,
        refreshToken: string,
    }) {
        return this.prismaService.adminSessions.create({
            data: {
                adminId: adminId,
                refreshToken: refreshToken,
            },
        });
    }
}
