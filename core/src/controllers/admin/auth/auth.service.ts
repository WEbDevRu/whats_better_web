import { Injectable,  Inject, forwardRef } from '@nestjs/common';
import { AdminWrongLoginOrPassword } from '../../../common/errors/admin.errors';
import { AdminRepository } from '../../../datasource/admin/adminRepository';
import { LoginRequest } from './requests/login.request';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => AdminRepository))
        private readonly adminRepository: AdminRepository,
    ) {}

    async loginAdmin({ req }:{ req: LoginRequest }): Promise<{ accessToken: string; }> {
        const result = await this.adminRepository.findAdminByEmail({
            email: req.email,
        });

        console.log(result);
        //throw new Error();
        throw new AdminWrongLoginOrPassword();
        return {
            accessToken: 'token',
        };
    }
}
