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
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginRequest } from './requests/login.request';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    //@UseGuards(AuthGuard('local'))
    @Put('/me')
    async loginAdmin(
        @Req() req,
        @Res() res,
        @Body() loginRequest:LoginRequest
    ) {
        const result = await this.authService.loginAdmin({
            req,
        });

        return res.status(HttpStatus.OK).send(result);
    }
}