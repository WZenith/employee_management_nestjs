import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    date_of_birth: Date;

    @IsNotEmpty()
    departmentId: number;

    @IsNotEmpty()
    designationId: number;
}
