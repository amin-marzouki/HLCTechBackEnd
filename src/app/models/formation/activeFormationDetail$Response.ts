import {student$Response} from "../student/student$Response";
import {PaymentResponse} from "../studentPayment/paymentResponse";
import {StudentAndPaymentResponse} from "../student/studentAndPayment$Response";

export class activeFormationDetail$Response{
  formationName?:string;
  formationImg?:string;
  totalIncome?:number;
  students?:StudentAndPaymentResponse[];

  industries?:string[];
  university?:string[];
  formerName?:string;
  numberOfStudent?:number;
  startAt?:Date;
  endAt?:Date;
  description?:String;
  restToPay?:String;
  totalToPay?:String;


}
