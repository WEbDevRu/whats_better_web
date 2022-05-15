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
    Delete, Put,
} from '@nestjs/common';
import { ComparisonEntityCategoryService } from './categories.service';
import { Roles } from '../../../decorators/role.decorator';
import { UserRoles } from '../../../common/const/USER_ROLES';
import { JwtAuthGuard } from '../../../middlewares/guards/jwt-auth.guard';
import { AddEntityCategoryRequest } from './requests/addEntityCategory.request';
import { EditEntityCategoryParamsRequest, EditEntityCategoryRequest } from './requests/editEnitityCategory.request';
import { DeleteEntityCategoryRequest } from './requests/deleteEntityCategory.request';
import { LoadEntityCategoriesRequest } from './requests/loadEntityCategories.request';
import { ParseIntPipe } from '../../../middlewares/parse-int.pipe';
import { ComparisonEntityCategoryEntity } from '../entities/comparisonEntityCategory.entity';


@Controller('comparison-entities-categories')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonEntityCategoryController {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityCategoryService))
        private readonly comparisonEntityCategoryService: ComparisonEntityCategoryService,
    ) {}


    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async addEntityCategory(
        @Req() req,
        @Body() addEntityCategoryRequest:AddEntityCategoryRequest,
    ):Promise<any> {
        const result = await this.comparisonEntityCategoryService.addEntityCategory({
            name: req.body.name,
            description: req.body.description,
        });

        return new ComparisonEntityCategoryEntity(result);
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Put('/:categoryId')
    async editEntityCategory(
        @Req() req,
        @Body() editEntityCategoryRequest:EditEntityCategoryRequest,
        @Param('categoryId') editEntityCategoryParamsRequest:EditEntityCategoryParamsRequest
    ):Promise<any> {
        const result = await this.comparisonEntityCategoryService.editEntityCategory({
            entityCategoryId: req.param.entityCategoryId,
            name: req.body.name,
            description: req.body.description,
        });
        
        return new ComparisonEntityCategoryEntity(result);
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete('/:entityCategoryId')
    async deleteEntityCategory(
        @Param() params,
        @Param() deleteEntityCategoryRequest:DeleteEntityCategoryRequest,
    ):Promise<any> {
        const result = await this.comparisonEntityCategoryService.deleteEntityCategory({
            entityCategoryId: params.entityCategoryId,
        });

        return new ComparisonEntityCategoryEntity(result);
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async loadEntitiesCategories(
        @Req() req,
        @Query() loadEntityCategoriesRequest:LoadEntityCategoriesRequest,
        @Query('page', new ParseIntPipe()) page,
        @Query('limit', new ParseIntPipe()) limit,
    ):Promise<any> {
        const result = await this.comparisonEntityCategoryService.loadEntityCategories({
            page,
            limit,
        });

        return {
            ...result,
            items: result.items.map?.((category) => new ComparisonEntityCategoryEntity(category)),
        };
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Get('/search')
    async searchEntitiesCategories (
        @Req() req,
    ):Promise<any> {
        const result = await this.comparisonEntityCategoryService.searchEntitiesCategories({ text: req.query.text });

        return {
            ...result,
        };
    }
}