import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository, EntityManager} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee)
  private employeeRepository: Repository<Employee>,
  private entityManager: EntityManager){    
  }

  async create(createEmployeeDto: Partial<Employee>) {     
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
    }

  async findAll() {
    const employees = await this.employeeRepository.find();

    employees.forEach(employee=>{
      delete employee.department.id;
      delete employee.designation.id;
      
    });
    return employees;
  }

  async findOne(emp_id: number) {
    return await this.employeeRepository.findOneBy({emp_id})
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto):Promise<Employee> {
    const employee = await this.findOne(id);
    
    if(!employee){
      throw new NotFoundException(`employee not with the name: ${id}`);
    }
    else{
      (await employee).name = await updateEmployeeDto.name;
    return await this.entityManager.save(employee);    
}

  }

  async remove(id: number) {
    const employee = this.findOne(id);

    if(!employee){
      throw new NotFoundException(`Employee not found with id: ${id}`);
    }
    else{
      await this.employeeRepository.delete(id);
      return "Successfully Deleted!"
    }
  }
}
