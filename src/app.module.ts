import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/entities/employee.entity';
import { DepartmentModule } from './department/department.module';
import { DesignationModule } from './designation/designation.module';
import { Department } from './department/entities/department.entity';
import { Designation } from './designation/entities/designation.entity';

@Module({
  imports: [EmployeeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'employee_db',
      entities: [Employee,Department,Designation]
      ,
      synchronize: true,
    }),
    DepartmentModule,
    DesignationModule

  ],
  controllers: [],
  providers: []
})
export class AppModule {}
