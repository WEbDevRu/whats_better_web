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
import { ComparisonService } from './comparison.service';
import { Roles } from '../../decorators/role.decorator';
import { UserRoles } from '../../common/const/USER_ROLES';
import { JwtAuthGuard } from '../../middlewares/guards/jwt-auth.guard';
import { CreateComparisonRequest } from './requests/createComparison';


@Controller('comparison')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonController {
    constructor(
        @Inject(forwardRef(() => ComparisonService))
        private readonly comparisonService: ComparisonService,
    ) {}

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createComparison(
        @Req() req,
        @Body() createComparisonRequest:CreateComparisonRequest,
    ):Promise<any> {
        const result = await this.comparisonService.addComparison({
            title: req.body.title,
            description: req.body?.title,
            categoryId: req.body.categoryId,
            comparisonsId: req.body.comparisonsId,
        });

        return result;
    }
}