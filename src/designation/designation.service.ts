import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { Designation } from './entities/designation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DesignationService {
  constructor(@InjectRepository(Designation)
  private designationRepository: Repository<Designation>,
  private entityManager: EntityManager){    
  }

  async create(createDesignationDto: CreateDesignationDto) {
    return await this.designationRepository.save(createDesignationDto);
  }

  async findAll() {
    return await this.designationRepository.find();
  }

  async findOne(id: number) {

    const query = this.designationRepository.createQueryBuilder('designation');
    query.where({ id});
    const designation = await query.getOne()

    // const found = await this.taskRepository.findOneBy({ id, user });

    if (designation) {
      // console.log(designations);
      return designation;
    }
    else {
      throw new NotFoundException(`Cannot found! with the given id:${id}`);
    }   
  }

  async update(id: number, updatedesignationDto: UpdateDesignationDto):Promise<Designation> {
    const designation = await this.findOne(id);
    
    if(!designation){
      throw new NotFoundException(`designation not with the name: ${id}`);
    }
    else{
      (await designation).name = await updatedesignationDto.name;
    return await this.entityManager.save(designation);    
    }
  }

  async remove(id: number) {
    const designation = this.findOne(id);

    if(!designation){
      throw new NotFoundException(`Designation not found with id: ${id}`);
    }
    else{
      await this.designationRepository.delete(id);
      return "Successfully Deleted!"
    }
  }
}
