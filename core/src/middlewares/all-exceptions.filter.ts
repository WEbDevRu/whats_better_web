import { FastifyReply } from 'fastify';
import {
    Catch,
    ArgumentsHost,
    HttpException,
    UnprocessableEntityException,
    HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { commonErrorsCodes } from '../common/errorsCodes/common.errorsCodes';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): unknown {
        const h = host.switchToHttp();
        const res = h.getResponse<FastifyReply>();

        if (exception instanceof HttpException) {
            let newException;

            if(!Array.isArray(exception.getResponse())) {
                const r = new UnprocessableEntityException(exception.getResponse());
                const rr = r.getResponse();
                return res.status(exception.getStatus()).send([rr]);
            } else {
                newException = exception;
            }

            return super.catch(newException, host);
        }

        const r = new UnprocessableEntityException(commonErrorsCodes.unhandledError);
        const rr = r.getResponse();

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send([rr]);
    }
}