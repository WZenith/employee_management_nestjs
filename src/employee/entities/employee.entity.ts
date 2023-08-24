import { Exclude } from "class-transformer";
import { Department } from "src/department/entities/department.entity";
import { Designation } from "src/designation/entities/designation.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee')
export class Employee {

    @PrimaryGeneratedColumn()
    emp_id: number;

    @Column()
    name:string;

    @Column({type:'date'})
    date_of_birth:Date;

    @ManyToOne(()=> Department, (department) => department.employees, {lazy:false,eager:true})
    @Exclude({ toPlainOnly: true, toClassOnly: false })
    department: Department;

    @ManyToOne(() => Designation, (designation) => designation.employees, {lazy:false,eager:true})
    @Exclude({ toPlainOnly: true, toClassOnly: false })
    designation: Designation;

}
