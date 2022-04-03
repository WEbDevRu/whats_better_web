import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Reflector } from '@nestjs/core';
import { AdminRepository } from '../../datasource/admin/adminRepository';
import { AdminWrongLoginOrPassword } from '../../common/errors/admin.errors';
import { UserRoles } from '../../common/const/USER_ROLES';
import { ROLES_KEY } from '../../decorators/role.decorator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private adminRepository: AdminRepository) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.adminRepository.findAdminByEmail({ email: email });

        if (!user) {
            throw new AdminWrongLoginOrPassword();
        }

        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) {
            throw new AdminWrongLoginOrPassword();
        }
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}