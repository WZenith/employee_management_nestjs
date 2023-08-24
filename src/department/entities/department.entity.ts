import { Employee } from "src/employee/entities/employee.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('department')
export class Department {

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @OneToMany(() => Employee, employee => employee.department,{eager:false})
    employees: Employee[];
}
