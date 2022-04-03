import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../common/const/USER_ROLES';
import { ROLES_KEY } from '../../decorators/role.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
    ) {
        super();
    }

    private requireRoles;

    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        this.requireRoles = requiredRoles;

        return super.canActivate(context);
    }


    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        if (this.requireRoles.includes(UserRoles.Admin)) {
            return {
                ...user,
                userRole: UserRoles.Admin,
            };
        }
        return user;
    }
}