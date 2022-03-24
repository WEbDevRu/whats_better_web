import {
    Body,
    Controller,
    Delete,
    forwardRef,
    Get,
    HttpStatus,
    Inject,
    Post,
    Put,
    Query,
    Req,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    @Put('/me')
    async loginAdmin(@Req() req, @Res() res) {
        const result = this.authService.loginAdmin({
            req,
        });

        return res.status(HttpStatus.OK).send(result);
    }
}