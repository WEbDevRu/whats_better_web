import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from '../../../datasource/admin/adminRepository';
import { VARS } from '../../../config/vars';
import { TOKEN_TYPES } from '../../../common/const/TOKENS';
import { UserRoles } from '../../../common/const/USER_ROLES';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => AdminRepository))
        private readonly adminRepository: AdminRepository,
        @Inject(forwardRef(() => JwtService))
        private readonly jwtService: JwtService,
    ) {}

    async loginAdmin({ user }): Promise<{
        accessToken: string,
        refreshToken: string,
    }> {

        const refreshToken = await this.jwtService.signAsync(
            {
                type: TOKEN_TYPES.ADMIN_REFRESH_TOKEN,
                data: {
                    adminId: user.id,
                    email: user.email,
                },
            }, {
                expiresIn: +VARS.adminRefreshTokenLiveTimeInSeconds * 1000,
            });

        const accessToken = await this.jwtService.signAsync(
            {
                type: TOKEN_TYPES.ADMIN_ACCESS_TOKEN,
                data: {
                    adminId: user.id,
                    email: user.email,
                },
            }, {
                expiresIn: +VARS.adminAccessTokenLiveTimeInSeconds * 1000,
            });

        await this.adminRepository.addAdminTokenSession({
            adminId: user.id,
            refreshToken: refreshToken,
        });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    async getAdminMe({ admin }:{ admin: { adminId: string, userRole: UserRoles.Admin }}) {
        const adminData = await this.adminRepository.findByAdminId({
            adminId: admin.adminId,
        });

        return adminData;
    }
}
