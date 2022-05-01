import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { VARS } from '../../config/vars';
import { TOKEN_TYPES } from '../../common/const/TOKENS';
import { AdminRepository } from '../../datasource/admin/adminRepository';
import { FastifyRequest } from 'fastify';
import { PrismaPostgres } from '../../providers/database/prismaPostres';
import { JwtService } from '@nestjs/jwt';

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        if (req.cookies['accessToken']) {
            token = req.cookies['accessToken'];
        }
        if (req.cookies['refreshToken']) {
            token = req.cookies['refreshToken'];
        }
    }
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private adminRepository: AdminRepository,
        private readonly prismaService: PrismaPostgres,
        private readonly jwtService: JwtService,
    ) {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: VARS.jwtSalt,
            passReqToCallback: true,
        });
    }

    async validate(
        request: FastifyRequest,
        payload: any,
    ) {
        if (TOKEN_TYPES.ADMIN_ACCESS_TOKEN === payload.type) {
            return { adminId: payload.data.adminId };
        }
        if (TOKEN_TYPES.ADMIN_REFRESH_TOKEN === payload.type) {
            const adminTokenSession = await this.adminRepository.getAdminTokenSession({
                adminId: payload.data.adminId,
                refreshToken: request.cookies?.refreshToken,
            });

            if (!adminTokenSession) {
                return  {};
            }
            
            const adminInfo = await this.adminRepository.findByAdminId({
                adminId: payload.data.adminId, 
            });

            const refreshToken = await this.jwtService.signAsync(
                {
                    type: TOKEN_TYPES.ADMIN_REFRESH_TOKEN,
                    data: {
                        adminId: adminInfo.id,
                        email: adminInfo.email,
                    },
                }, {
                    expiresIn: +VARS.adminRefreshTokenLiveTimeInSeconds * 1000,
                });

            const accessToken = await this.jwtService.signAsync(
                {
                    type: TOKEN_TYPES.ADMIN_ACCESS_TOKEN,
                    data: {
                        adminId: adminInfo.id,
                        email: adminInfo.email,
                    },
                }, {
                    expiresIn: +VARS.adminAccessTokenLiveTimeInSeconds * 1000,
                });


            await this.prismaService.$transaction([
                this.adminRepository.deleteAdminTokenSessionSync({ refreshToken: adminTokenSession.refreshToken }),
                this.adminRepository.addAdminTokenSessionSync({
                    adminId: adminTokenSession.adminId,
                    refreshToken,
                }),
            ]);


            return {
                adminId: payload.data.adminId,
                needUpdateTokens: true,
                newRefreshToken: refreshToken,
                newAccessToken: accessToken,
            };
        }
        return {};
    }
}