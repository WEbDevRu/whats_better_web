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
    Post,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { ComparisonCategoryService } from './comparisonCategory.service';
import { Roles } from '../../decorators/role.decorator';
import { UserRoles } from '../../common/const/USER_ROLES';
import { JwtAuthGuard } from '../../middlewares/guards/jwt-auth.guard';
import { AdminEntity } from '../admin/entities/admin.entity';
import { ComparisonCategoryEntity } from './entities/comparisonCategory.entity';
import { LoginRequest } from '../admin/auth/requests/login.request';
import { CreateCategoryRequest } from './requests/createCategory.request';


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
    async getMeAdmin(
        @Req() req,
        @Body() createCategoryRequest:CreateCategoryRequest,
    ):Promise<ComparisonCategoryEntity> {
        const result = await this.comparisonCategoryService.addCategory({
            title: req.body.title,
            description: req.body.description,
        });

        return new ComparisonCategoryEntity(result);
    }
}