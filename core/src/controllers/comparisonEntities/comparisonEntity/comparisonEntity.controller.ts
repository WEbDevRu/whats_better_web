import {
    Body,
    Controller,
    forwardRef,
    Get,
    Inject,
    Req,
    Post,
    Param,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Query,
    Delete,
} from '@nestjs/common';
import { ComparisonEntityService } from './comparisonEntity.service';


@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonEntityController {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityService))
        private readonly comparisonEntityService: ComparisonEntityService,
    ) {}

}