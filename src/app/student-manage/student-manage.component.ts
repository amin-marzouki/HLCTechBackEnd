import { Component } from '@angular/core';
import {Student} from "../models/student/student.model";

@Component({
  selector: 'app-student-manage',
  templateUrl: './student-manage.component.html',
  styleUrl: './student-manage.component.scss'
})
export class StudentManageComponent {
  isStudentlistActive =true;
  isStudentDetailActive =false;

   studentp ={studentId:1,
  name:"string",
  famillyName:"string",
  Cin:"string",
  phoneNumber: 2,
  classe:"string",
  email:"string",
  adresse:"string",
  formation_id:1,

  }
  addItem(newItem:any) {
    this.isStudentDetailActive=newItem.data1;
    this.isStudentlistActive=false;

    this.studentp=newItem.student;

  }

  activateListStudent(state:any){
     this.isStudentlistActive=true;
     this.isStudentDetailActive=false;

  }

}
