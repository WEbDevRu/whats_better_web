import { HttpStatus, HttpException } from '@nestjs/common';
import { commonErrorsCodes } from '../erorrsCodes/common.errorsCodes';


export class CommonErrorsUnhandledError extends HttpException {
    constructor() {
        super(commonErrorsCodes.unhandledError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
