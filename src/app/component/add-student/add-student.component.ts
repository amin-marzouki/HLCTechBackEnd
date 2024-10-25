import { Component } from '@angular/core';
import {Student} from "../../models/student/student.model";
import {StudentService} from "../../services/student/student.service";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
student : Student ={

  name:'',
  famillyName:'',
  Cin:'',
  phoneNumber: null,
  }
 submitted= false
  constructor(private studentService:StudentService) {}

  saveStudent():void{
 const data ={
   name:this.student.name,
   famillyName:this.student.famillyName,
   cin:this.student.Cin,
   phoneNumber: this.student.phoneNumber,
 }
this.studentService.create(data)
  .subscribe({
    next: (res) => {
      console.log(res);
      this.submitted = true;

    },
    error: (e) => console.error(e)
  })
   }

   newStudent():void{
  this.submitted=false;
  this.student={
    name:'',
    famillyName:'',
    Cin:'',
    phoneNumber: null,
  }
   }



}
