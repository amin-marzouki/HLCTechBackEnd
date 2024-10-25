import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from "../../models/student/student.model";
import {StudentService} from "../../services/student/student.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Payment} from "../../models/studentPayment/payment.model";

import {FormControl, Validators} from "@angular/forms";
import {PaymentService} from "../../services/payment/payment.service";
import {studentFormationPayments$params} from "../../models/studentFormationPayments/studentFormationPayments";
import {studentFormationPayments$request} from "../../services/fn/student/findStudentFormationAndPamyents";

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit{
  constructor (private paymentService :PaymentService,private StudentServ:StudentService){

  }
 formationPaymentList?:studentFormationPayments$params[];
  @Input() studentpass?:Student;
  @Output() isStudentlist= new EventEmitter<any>();
  student?:Student;

  ngOnInit(): void {
    //this.loadData(this.studentpass?.studentId);*
    this.retrieveStudentPayment(this.studentpass?.studentId);
    this.retrieveStudentById(this.studentpass?.studentId)

  }
  expandedIndex: number | null = null;

  togglePayments(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
  retrieveStudentPayment( student_id:number){

this.StudentServ.findStudentFormationAndPamyents({'student_id':student_id}).subscribe({
    next:(detail)=>
    {
      console.log(detail);
      this.formationPaymentList=detail;
    }
  })}
  retrieveStudentById(student_id:number){
    this.StudentServ.findStudentById({'student_id':student_id}).subscribe(
      {
        next:(detail)=>{
          this.student=detail;
        }
      }
    )
  }
/*
paymentlist?:Payment[]=[];
  isAddingPayment = false;
  amountFormControl = new FormControl(0,[Validators.required]);
  paymentDateFormControl = new FormControl();
  formationFormControll = new FormControl('',[Validators.required]);
  reciveFormControl = new FormControl('',[Validators.required]);
  detailFormControl = new FormControl('',[Validators.required]);
loadData(student_id:any){
  this.paymentService.getAll(student_id).subscribe({
    next:(data)=>{

   this.paymentlist=data;
      console.log(this.paymentlist);


  }
  })
}

  onAddPaymentClick(){
  this.isAddingPayment=true;
  }
  ondonePaymentlick(){
 const payment: Payment={
        Amount: this.amountFormControl.value,
        Date: this.paymentDateFormControl.value,
        Detail: `${this.detailFormControl.value}`,
        Student_id: this.studentpass?.studentId.value,
        receiver: `${this.reciveFormControl.value}`,
    };

    this.paymentService.add(payment).subscribe({
      next:(data)=>{
        console.log(data)
      }

  })
}
  onBackToList(){

    this.isStudentlist.emit(true);
  }
  onCancelAddClick(){
  this.isAddingPayment=false;
  }
  isAddDisabled(){
  if(this.reciveFormControl.invalid || this.formationFormControll.invalid || this.amountFormControl.invalid ||this.detailFormControl.invalid){
    return true;
  }
  else {
    return false;
  }
  }
  getErrorMessage(formControl: FormControl): string {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    if (formControl.hasError('email')) {
      return 'Not a valid email';
    }

    if (formControl.hasError('invalidSchoolId')) {
      return formControl.getError('invalidSchoolId').errorMsg;
    }

    return '';
  }*/
}
