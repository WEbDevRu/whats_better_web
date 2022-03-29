import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminRepository } from '../../../datasource/admin/adminRepository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private adminRepository: AdminRepository) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('here')
        const user = await this.adminRepository.findAdminByEmail({ email: email });

        console.log(user);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}