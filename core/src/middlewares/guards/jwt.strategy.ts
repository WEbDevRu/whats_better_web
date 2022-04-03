import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { VARS } from '../../config/vars';
import { TOKEN_TYPES } from '../../common/const/TOKENS';

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['accessToken'];
    }
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: VARS.jwtSalt,
        });
    }

    async validate(payload: any) {
        if (TOKEN_TYPES.ADMIN_ACCESS_TOKEN === payload.type) {
            return { adminId: payload.data.adminId };
        }
        return {};
    }
}