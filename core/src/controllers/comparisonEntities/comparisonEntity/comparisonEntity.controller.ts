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
import { AddEntityCategoryRequest } from './requests/addEntityCategory.request';
import { EditEntityCategoryRequest, EditEntityCategoryParamsRequest } from './requests/editEnitityCategory.request';
import { DeleteEntityCategoryRequest } from './requests/deleteEntityCategory.request';
import { LoadEntityCategoriesRequest } from './requests/loadEntityCategories.request';
import { ParseIntPipe } from '../../../middlewares/parse-int.pipe';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonEntityController {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityService))
        private readonly comparisonEntityService: ComparisonEntityService,
    ) {}

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async addEntityCategory(
        @Req() req,
        @Body() addEntityCategoryRequest:AddEntityCategoryRequest,
    ):Promise<any> {

    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Put('/:categoryId')
    async editEntityCategory(
        @Req() req,
        @Body() editEntityCategoryRequest:EditEntityCategoryRequest,
        @Param('categoryId') editEntityCategoryParamsRequest:EditEntityCategoryParamsRequest
    ):Promise<any> {

    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete('/:categoryId')
    async deleteEntityCategory(
        @Req() req,
        @Body() deleteEntityCategoryRequest:DeleteEntityCategoryRequest
    ):Promise<any> {

    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async loadEntitiesCategoiries(
        @Req() req,
        @Query() loadEntityCategoriesRequest:LoadEntityCategoriesRequest,
        @Query('page', new ParseIntPipe()) page,
        @Query('limit', new ParseIntPipe()) limit,
    ):Promise<any> {

    }
}