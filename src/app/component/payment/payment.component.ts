import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student/student.service";
import {PaymentService} from "../../services/payment/payment.service";
import {HttpClient} from "@angular/common/http";
import {StrictHttpResponse} from "../../services/http/StrictHttpResponse";
import {Observable} from "rxjs";
import {findStudentPaymentList} from "../../services/fn/student/find-Student-Payment-List";
import {PaymentResponse} from "../../models/studentPayment/paymentResponse";
import {Student} from "../../models/student/student.model";
import {FormControl, Validators} from "@angular/forms";
import {Payment} from "../../models/studentPayment/payment.model";
import {PaymentRequest$Params} from "../../models/studentPayment/paymentRequest$Params";
import {addStudentPayment} from "../../services/fn/student/addStudentPayment";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements AfterViewInit,OnInit{
constructor(private paymentServ:PaymentService,private route: ActivatedRoute,){}
  ngAfterViewInit(): void {
    // Initialization logic here
    this.paymentList();

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.student_id = Number(params.get('student_id'));

    });
  }
  isProcessing=true;
  student_id:number| null = null;
  paymentResponse:PaymentResponse[]=[];
  paymentFilter:PaymentResponse[]=[];

isAdding=false;
  recieverFormControl = new FormControl('',[Validators.required]);
  DetailFormControl = new FormControl('',[Validators.required]);
  Student_nameFormControl = new FormControl('',[Validators.required]);
  DateFormControl = new FormControl(new Date(),[Validators.required]);
  AmountFormControl = new FormControl(0,[Validators.required]);
  onAddStudentClick(){
    this.isAdding=true;
  }
  isAddDisabled(){
    if(this.recieverFormControl.invalid || this.DetailFormControl || this.Student_nameFormControl.invalid || this.DateFormControl.invalid || this.AmountFormControl.invalid ){
      return true;
    }
    return false;
  }
  filterResults(text: string) {

    if (!text) {
      this.paymentFilter = this.paymentResponse;
      return;
    }

    this.paymentFilter = this.paymentResponse.filter(
      st =>
        st?.Student_name?.toLowerCase().includes(text.toLowerCase()),


    );
    this.paymentFilter=  this.paymentFilter.concat(this.paymentResponse.filter(
      st =>
        st?.formation_name?.toLowerCase().includes(text.toLowerCase()),


    )

   );

    console.log(this.paymentFilter)
  }

  getErrorMessage(formControl: FormControl): string {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    if (formControl.hasError('email')) {
      return 'Not a valid email';
    }


    return '';
  }

  paymentList(){
  this.paymentServ.findStudentPamyents({student_id:this.student_id??0}).subscribe({
    next: (pay) => {
      console.log(pay)
      this.paymentFilter=pay;
      this.paymentResponse = pay;
      console.log(this.paymentResponse)

    }

    });
  }
  adding(){
    return this.isAdding;
  }

  onAddClick(){
    this.isAdding=true
    const paymenrReq: PaymentRequest$Params = {
      student_id: this.student_id??this.paymentResponse[0].student_id,
      description: `${this.DetailFormControl.value}`,
      amount: this.AmountFormControl.value?? 0,
      payment_date: this.DateFormControl.value? new Date(this.DateFormControl.value) : undefined,
      manager_id: this.paymentResponse[0].manager_id,

    };

    this.paymentServ.addStudentPayment({body:paymenrReq}).subscribe({
      next:(res)=>{
        console.log(res);
        this.isProcessing = false;
      },
      error: (e) => console.error(e)
    })



  }
  onCancelAddClick(){
    this.isAdding=false
  }

}
