import {PaymentResponse} from "../studentPayment/paymentResponse";

export class StudentAndPaymentResponse{

  name?:string;
  famillyName?:string;
  Cin?:string;
  phoneNumber?: Number | null=null;
  classe?:string;
  email?:string;
  adresse?:string;
  payments?:PaymentResponse[];
  payed?:number;
  rest?:number;
  industry?:string;
  univirsity?:string;
}
