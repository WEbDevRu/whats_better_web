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
import { ComparisonCategoryService } from './comparisonCategory.service';
import { Roles } from '../../decorators/role.decorator';
import { UserRoles } from '../../common/const/USER_ROLES';
import { JwtAuthGuard } from '../../middlewares/guards/jwt-auth.guard';
import { ComparisonCategoryEntity } from './entities/comparisonCategory.entity';
import { CreateCategoryRequest } from './requests/createCategory.request';
import { ParseIntPipe } from '../../middlewares/parse-int.pipe';
import { LoadCategoriesRequest } from './requests/loadCategories.request';
import { DeleteCategoryRequest } from './requests/deleteCategory.request';


@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonCategoryController {
    constructor(
        @Inject(forwardRef(() => ComparisonCategoryService))
        private readonly comparisonCategoryService: ComparisonCategoryService,
    ) {}

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Post('category')
    async createCategory(
        @Req() req,
        @Body() createCategoryRequest:CreateCategoryRequest,
    ):Promise<ComparisonCategoryEntity> {
        const result = await this.comparisonCategoryService.addCategory({
            title: req.body.title,
            description: req.body.description,
        });

        return new ComparisonCategoryEntity(result);
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Get('categories')
    async loadCategoriesList(
        @Req() req,
        @Query('page', new ParseIntPipe()) page,
        @Query('limit', new ParseIntPipe()) limit,
        @Query() loadCategoriesRequest:LoadCategoriesRequest
    ):Promise<any> {

        const result = await this.comparisonCategoryService.loadCategoriesList({
            page,
            limit,
        });

        return {
            ...result,
            items: result.items.map?.((category) => new ComparisonCategoryEntity(category)),
        };
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete('category/:id')
    async deleteCategory(
        @Req() req,
        @Param() deleteCategoryRequest:DeleteCategoryRequest
    ):Promise<any> {
        const result = await this.comparisonCategoryService.deleteCategory({
            id: req.params.id,
        });
        return  result;
    }
}