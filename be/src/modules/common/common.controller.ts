import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonService } from '@/modules/common/common.service';

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('share')
  @ApiOperation({ summary: 'Get shared content' })
  @ApiResponse({ status: 200, description: 'Shared content for all users' })
  getShare(): string {
    return this.commonService.getShare();
  }
}
