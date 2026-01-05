import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from '@/modules/admin/admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard' })
  @ApiResponse({ status: 200, description: 'Dashboard content for admin' })
  getDashboard(): string {
    return this.adminService.getDashboard();
  }
}
