import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@Controller('designation')
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  @Post()
  async create(@Body() createDesignationDto: CreateDesignationDto) {
    return await this.designationService.create(createDesignationDto);
  }

  @Get()
  async findAll() {
    return await this.designationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.designationService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDesignationDto: UpdateDesignationDto) {
    return await this.designationService.update(+id, updateDesignationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.designationService.remove(+id);
  }
}
