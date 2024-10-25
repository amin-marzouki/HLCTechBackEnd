import {RequestBuilder} from "../../http/RequestBuilder";
import {filter, map} from "rxjs/operators";
import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {StrictHttpResponse} from "../../http/StrictHttpResponse";
import {PaymentResponse} from "../../../models/studentPayment/paymentResponse";
import {FindStudentPaymentList$Params} from "./find-Student-Payment-List";
import {studentFormationPayments$params} from "../../../models/studentFormationPayments/studentFormationPayments";
import {StudentAndPaymentResponse} from "../../../models/student/studentAndPayment$Response";
export  interface studentFormationPayments$request{
  student_id?:number;
}
export function findStudentFormationAndPamyents(http: HttpClient, rootUrl: string, params?: studentFormationPayments$request, context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, findStudentFormationAndPamyents.PATH, 'get');
  if (params) {
    rb.path('student_id', params.student_id, {});

  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<studentFormationPayments$params[]>;
    })
  );

}
findStudentFormationAndPamyents.PATH="/studentFormationPayment/{student_id}"
