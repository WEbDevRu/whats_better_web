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
import { AddEntityRequest } from './requests/addEntity.request';
import { LoadEntityRequest } from './requests/loadEntities.request';
import { ComparisonEntity } from '../entities/comparisonEntity.entity';
import { ParseIntPipe } from '../../../middlewares/parse-int.pipe';

@Controller('comparison-entity')
@UseInterceptors(ClassSerializerInterceptor)
export class ComparisonEntityController {
    constructor(
        @Inject(forwardRef(() => ComparisonEntityService))
        private readonly comparisonEntityService: ComparisonEntityService,
    ) {}

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async addComparisonEntity(
        @Req() req,
        @Body() addEntityRequest:AddEntityRequest
    ):Promise<any> {
        const result = await this.comparisonEntityService.addEntity({
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
            link: req.body.link,
        });

        return new ComparisonEntity(result);
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async loadComparisonEntities(
        @Req() req,
        @Query('page', new ParseIntPipe()) page,
        @Query('limit', new ParseIntPipe()) limit,
        @Query() loadEntitiesRequest:LoadEntityRequest
    ):Promise<any> {
        const result = await this.comparisonEntityService.loadEntities({
            page,
            limit,
        });

        return {
            ...result,
            items: result.items?.map((item) => new ComparisonEntity(item)),
        };
    }
}