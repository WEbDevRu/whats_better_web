import { Injectable,  Inject, forwardRef } from '@nestjs/common';
import { AdminWrongLoginOrPassword } from '../../../common/errors/admin.errors';

@Injectable()
export class AuthService {
    constructor(
        
    ) {}

    loginAdmin({ req }): { accessToken: string; } {
        console.log(req);
        throw new Error();
        throw new AdminWrongLoginOrPassword;
        return {
            accessToken: 'token',
        };
    }
}
