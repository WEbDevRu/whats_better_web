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
import { ComparisonCategoryService } from './comparisonCategory.service';


@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonCategoryController {
    constructor(
        @Inject(forwardRef(() => ComparisonCategoryService))
        private readonly comparisonCategoryService: ComparisonCategoryService,
    ) {}

}