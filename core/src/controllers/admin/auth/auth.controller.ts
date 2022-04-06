import {
    Body,
    Controller,
    forwardRef,
    Get,
    HttpStatus,
    Inject,
    Put,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../decorators/role.decorator';
import { AuthService } from './auth.service';
import { LoginRequest } from './requests/login.request';
import { VARS } from '../../../config/vars';
import { JwtAuthGuard } from '../../../middlewares/guards/jwt-auth.guard';
import { UserRoles } from '../../../common/const/USER_ROLES';
import { AdminEntity } from '../entities/admin.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMeAdmin(
        @Req() req,
    ):Promise<AdminEntity> {
        const result = await this.authService.getAdminMe({
            admin: req.user,
        });

        return new AdminEntity(result);
    }

    @UseGuards(AuthGuard('local'))
    @Put('/me')
    async loginAdmin(
        @Req() req,
        @Res() res,
        @Body() loginRequest:LoginRequest
    ) {
        const result = await this.authService.loginAdmin({
            user: req.user,
        });

        res.cookie('refreshToken', result.refreshToken, {
            expires: new Date(Date.now() + +VARS.adminRefreshTokenLiveTimeInSeconds * 1000),
            sameSite: 'strict',
            httpOnly: true,
            hostOnly: true,
            path: '/',
        });

        res.cookie('accessToken', result.accessToken, {
            expires: new Date(Date.now() + +VARS.adminAccessTokenLiveTimeInSeconds * 1000),
            sameSite: 'strict',
            httpOnly: true,
            hostOnly: true,
            path: '/',
        });

        return res.status(HttpStatus.OK).send(result);
    }
}