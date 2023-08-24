import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentService {
  
  constructor(@InjectRepository(Department)
  private departmentRepository: Repository<Department>,
  private entityManager: EntityManager){    
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentRepository.save(createDepartmentDto);
  }

  async findAll() {
    return await this.departmentRepository.find();
  }

  async findOne(id: number) {

    const query = this.departmentRepository.createQueryBuilder('Department');
    query.where({ id});
    const Department = await query.getOne()

    // const found = await this.taskRepository.findOneBy({ id, user });

    if (Department) {
      // console.log(Departments);
      return Department;
    }
    else {
      throw new NotFoundException(`Cannot found! with the given id:${id}`);
    }   
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto):Promise<Department> {
    const department = await this.findOne(id);
    
    if(!department){
      throw new NotFoundException(`Department not with the name: ${id}`);
    }
    else{
      (await department).name = await updateDepartmentDto.name;
    return await this.entityManager.save(department);    
    }
  }

  async remove(id: number) {
    const department = this.findOne(id);

    if(!department){
      throw new NotFoundException(`Department not found with id: ${id}`);
    }
    else{
      await this.departmentRepository.delete(id);
      return "Successfully Deleted!"
    }
  }
}
