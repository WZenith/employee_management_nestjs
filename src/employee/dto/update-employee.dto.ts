import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsNotEmpty } from '@nestjs/class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {

    @IsNotEmpty()
    name:string;
}
