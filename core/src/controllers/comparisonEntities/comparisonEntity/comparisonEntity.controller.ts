import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    forwardRef,
    Inject,
    Post,
    Put,
    Get,
    Req,
    UseGuards,
    UseInterceptors,
    Query,
    Param,
} from '@nestjs/common';
import { ComparisonEntityService } from './comparisonEntity.service';
import { UserRoles } from '../../../common/const/USER_ROLES';
import { Roles } from '../../../decorators/role.decorator';
import { JwtAuthGuard } from '../../../middlewares/guards/jwt-auth.guard';
import { AddEntityCategoryRequest } from '../categories/requests/addEntityCategory.request';
import { EditEntityCategoryRequest, EditEntityCategoryParamsRequest } from '../categories/requests/editEnitityCategory.request';
import { DeleteEntityCategoryRequest } from '../categories/requests/deleteEntityCategory.request';
import { LoadEntityCategoriesRequest } from '../categories/requests/loadEntityCategories.request';
import { ParseIntPipe } from '../../../middlewares/parse-int.pipe';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonEntityController {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityService))
        private readonly comparisonEntityService: ComparisonEntityService,
    ) {}
}