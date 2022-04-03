import { HttpStatus, HttpException } from '@nestjs/common';
import { adminErrorsCodes } from '../errorsCodes/admin.errorsCodes';


export class AdminWrongLoginOrPassword extends HttpException {
    constructor() {
        super(adminErrorsCodes.wrongLoginOrPassword, HttpStatus.BAD_REQUEST);
    }
}
