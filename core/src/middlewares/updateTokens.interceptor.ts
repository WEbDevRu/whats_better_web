import {
    Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map } from 'rxjs/operators';
import { VARS } from '../config/vars';

@Injectable()
export class UpdateTokensInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();

        if (request?.user?.adminId && request?.user?.needUpdateTokens) {

            response.cookie('refreshToken', request.user.newRefreshToken, {
                expires: new Date(Date.now() + +VARS.adminRefreshTokenLiveTimeInSeconds * 1000),
                sameSite: 'strict',
                httpOnly: true,
                hostOnly: true,
                path: '/',
            });

            response.cookie('accessToken',  request.user.newAccessToken, {
                expires: new Date(Date.now() + +VARS.adminAccessTokenLiveTimeInSeconds * 1000),
                sameSite: 'strict',
                httpOnly: true,
                hostOnly: true,
                path: '/',
            });
        }

        return next.handle().pipe(
            map(flow => {
                return flow;
            })
        );
    }
}