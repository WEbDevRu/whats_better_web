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
import { ComparisonEntityCategoryService } from './categories.service';


@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonEntityCategoryController {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityCategoryService))
        private readonly comparisonEntityCategoryService: ComparisonEntityCategoryService,
    ) {}

}